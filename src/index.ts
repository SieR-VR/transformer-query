import ts from "typescript";
import * as path from "path";

import { PluginConfig } from "./pluginConfig";
import { Parser } from "./hyper/parser";

interface Source<T extends ts.Node = ts.Node> {
    readonly ast: T;
    readonly sourceFile: ts.SourceFile;

    query(q: Query): Source<ts.Node>[];
    replace(replacer: (node: ts.Node) => ts.Node): Source<T>;
    replaceWith(toReplace: ts.Node): Source<T>;
    replaceText(replacer: (node: ts.Node) => string): Source<T>;
    replaceWithText(toReplace: string): Source<T>;
    remove(): void;
}

interface Query {
    readonly ast: ts.Node;
    readonly sourceFile: ts.SourceFile;
}

export function q(strings: TemplateStringsArray, ...userMatches: any[]): Query {
    const hashes = (userMatches as (string | InternalWildcard)[] || []).map((match) => {
        if (match === Identifier) {
            return "__IDENTIFIER__";
        }

        if (match === StringLiteral) {
            return "\"__STRING_LITERAL__\"";
        }

        if (match === NumericLiteral) {
            return "0xC_0_F_F_E_E";
        }

        return match;
    });

    const original = strings.reduce((acc, str, i) => {
        return acc + str + (hashes[i] || "");
    }, "");

    const ast = ts.createSourceFile("query.ts", original, ts.ScriptTarget.Latest, false);

    return {
        ast,
        sourceFile: ast,
    };
}

export function makeTransform(
    rules: Array<(src: Source, checker: ts.TypeChecker) => void>,
): (program: ts.Program, pluginConfig: PluginConfig) => (context: ts.TransformationContext) => ts.Transformer<ts.SourceFile> {
    return (program, pluginConfig) => (context: ts.TransformationContext) => {
        const checker = program.getTypeChecker();

        return (sourceFile: ts.SourceFile) => {
            const src: Source<ts.SourceFile> = {
                ast: sourceFile,
                sourceFile,
                query(q) {
                    const queryResult: Source[] = [];
                    
                    ts.visitEachChild(
                        this.ast, 
                        makeVisitor((node) => { 
                            queryResult.push({
                                ast: node,
                                sourceFile,

                        }, q);

                        return undefined;
                    }), context)
                },
            }

            const makeSource = <T extends ts.Node>(ast: T, sourceFile: ts.SourceFile, q?: Query): Source<T> => {
                return {
                    ast,
                    sourceFile,
                    query: makeQuery(ast, sourceFile),
                    replace(replacer) {
                        ts.visitEachChild(ast, makeVisitor(replacer, q), context);
                        return this;
                    },
                    replaceWith(toReplace) {
                        ts.visitEachChild(ast, makeVisitor((node) => toReplace, q), context);
                        return this;
                    },
                    replaceText(replacer) {
                        ts.visitEachChild(ast, makeVisitor(((node) => {
                            const toReplace = ts.createSourceFile("toReplace.ts", replacer(node), ts.ScriptTarget.Latest);
                            return toReplace;
                        })), context);
                        return this;
                    },
                    replaceWithText(toReplace) {
                        const toReplaceNode = ts.createSourceFile("toReplace.ts", toReplace, ts.ScriptTarget.Latest);
                        ts.visitEachChild(ast, makeVisitor((node) => toReplaceNode), context);
                        return this;
                    },
                }
            }

            const makeQuery = (ast: ts.Node, sourceFile: ts.SourceFile) => (q: Query) => {
                const queryResult: Source[] = [];

                ts.visitEachChild(
                    ast, 
                    makeVisitor((node) => {
                        queryResult.push(makeSource(ast, sourceFile, q));
                        return undefined;
                    }, q),
                    context
                );
            }


            const makeVisitor = (transform: (node: ts.Node) => ts.Node | undefined, query?: Query) => (node: ts.Node): ts.Node | undefined => {
                if (query && isNodeContains(checker, { node, source: sourceFile }, query)) {
                    return transform(node);
                }

                return ts.visitEachChild(node, makeVisitor(transform, query), context);
            };

            return smallTransforms.reduce((acc, { query, transform }) => {
                return ts.visitEachChild(acc, visitor(query, transform), context);
            }, sourceFile);
        };
    };
}

function isNodeContains(checker: ts.TypeChecker, target: Target, query: Query): boolean {
    let queryAST = query.queryAST;
    while (queryAST && (queryAST.kind === ts.SyntaxKind.SourceFile || queryAST.kind === ts.SyntaxKind.SyntaxList || queryAST.kind === ts.SyntaxKind.ExpressionStatement)) {
        queryAST = queryAST.getChildAt(0, query.querySource);
    }

    let nodeAST = target.node;
    while (nodeAST && (nodeAST.kind === ts.SyntaxKind.SourceFile || nodeAST.kind === ts.SyntaxKind.SyntaxList || nodeAST.kind === ts.SyntaxKind.ExpressionStatement)) {
        nodeAST = nodeAST.getChildAt(0, target.source);
    }

    if (!nodeAST || !queryAST) return false;
    if (nodeAST.kind !== queryAST.kind) return false;

    if (nodeAST.kind === ts.SyntaxKind.Identifier) {
        const queryIdentifier = queryAST.getText(query.querySource);
        if (queryIdentifier.startsWith("_$") && queryIdentifier.endsWith("$_")) {
            return queryIdentifier.slice(2, -2) === hashNode(checker, nodeAST);
        }

        return (nodeAST.getText() === queryAST.getText(query.querySource))
            || (queryIdentifier === "__IDENTIFIER__");
    }

    if (nodeAST.kind === ts.SyntaxKind.StringLiteral) {
        return (nodeAST.getText() === queryAST.getText(query.querySource))
            || (queryAST.getText(query.querySource) === "\"__STRING_LITERAL__\"");
    }

    if (nodeAST.kind === ts.SyntaxKind.NumericLiteral) {
        return (nodeAST.getText() === queryAST.getText(query.querySource))
            || (queryAST.getText(query.querySource) === "0xC_0_F_F_E_E");
    }

    if (ts.isHeritageClause(nodeAST)) {
        const targetHeritages = nodeAST.types.map((heritage) => hashNode(checker, heritage.expression));
        const queryHeritages = (queryAST as ts.HeritageClause).types;

        return queryHeritages.every((queryHeritage) => {
            const queryHeritageText = queryHeritage.getText(query.querySource);
            if (queryHeritageText.startsWith("_$") && queryHeritageText.endsWith("$_")) {
                return targetHeritages.includes(queryHeritageText.slice(2, -2));
            }

            return false;
        });
    }

    const matched = queryAST.getChildren(query.querySource).map((child) => {
        const nodeChildrenFiltered = nodeAST.getChildren().filter((nodeChild) => nodeChild.kind === child.kind);
        const matched = nodeChildrenFiltered.map((nodeChild) => {
            return isNodeContains(checker, {
                node: nodeChild,
                source: target.source,
            }, {
                queryAST: child,
                querySource: query.querySource,
            })
        });

        if (!matched.length || matched.some((m) => m)) {
            return true;
        }

        return false;
    });

    return !matched.length || matched.every((m) => m);
}

export function hashNode(checker: ts.TypeChecker, node: ts.Node): string {
    let symbol = checker.getSymbolAtLocation(node);
    if (symbol) {
        try { symbol = checker.getAliasedSymbol(symbol); }
        catch (e) { symbol = checker.getSymbolAtLocation(node)!; }

        const fileLocation = symbol.declarations![0].getSourceFile().fileName;

        const relative = path.relative(process.cwd(), fileLocation);
        const nodeText = node.getText();

        return simpleHash(`${relative}:${nodeText}`);
    }
    else {
        console.log("No symbol for node", node.getText());

        const fileLocation = node.getSourceFile().fileName;

        const relative = path.relative(process.cwd(), fileLocation);
        const nodeText = node.getText();

        console.log("Hashing", `${relative}:${nodeText}`);

        return simpleHash(`${relative}:${nodeText}`);
    }
}

export function simpleHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
}

export class Identifier { };
export class StringLiteral { };
export class NumericLiteral { };

type InternalWildcard = typeof Identifier | typeof StringLiteral | typeof NumericLiteral;