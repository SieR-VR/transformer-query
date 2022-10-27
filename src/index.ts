import ts from "typescript";
import { PluginConfig } from "./pluginConfig";

interface Tree {
    readonly ast: ts.Node;
    query(q: Query): Queried;
}

interface Query {
    readonly queryAST: ts.Node;
    readonly querySource: ts.SourceFile;
}

interface Queried {
    replace(replacer: (node: ts.Node, typeNode: ts.Type) => ts.Node): Queried;
    replaceWith(toReplace: ts.Node): Queried;
    replaceText(replacer: (node: ts.Node, type: ts.Type) => string): Queried;
    replaceWithText(toReplace: string): Queried;
    remove(): void;
}

export function q(strings: TemplateStringsArray, ..._hashes: any[]): Query {
    const hashes = _hashes as string[] || [];

    const original = strings.reduce((acc, str, i) => {
        return acc + str + (hashes[i] || "");
    }, "");

    const ast = ts.createSourceFile("query.ts", original, ts.ScriptTarget.ES2015, false);

    return {
        queryAST: ast,
        querySource: ast,
    };
}

export function makeTransform(
    rules: Array<(tree: Tree) => void>,
): (program: ts.Program, pluginConfig: PluginConfig) => (context: ts.TransformationContext) => ts.Transformer<ts.SourceFile> {
    return (program, pluginConfig) => (context: ts.TransformationContext) => {
        const checker = program.getTypeChecker();

        return (sourceFile: ts.SourceFile) => {
            const smallTransforms: Array<{
                query: Query,
                transform: (node: ts.Node) => ts.Node | undefined
            }> = [];

            const tree: Tree = {
                ast: sourceFile,
                query(q: Query) {
                    return {
                        replace(replacer: (node: ts.Node, typeNode: ts.Type) => ts.Node) {
                            smallTransforms.push({
                                query: q,
                                transform: (node: ts.Node) => {
                                    const typeNode = checker.getTypeAtLocation(node);
                                    return replacer(node, typeNode);
                                }
                            });

                            return this;
                        },
                        replaceWith(toReplace: ts.Node) {
                            smallTransforms.push({
                                query: q,
                                transform: (node: ts.Node) => toReplace
                            });

                            return this;
                        },
                        replaceText(replacer: (node: ts.Node, type: ts.Type) => string) {
                            smallTransforms.push({
                                query: q,
                                transform: (node: ts.Node) => {
                                    const typeNode = checker.getTypeAtLocation(node);
                                    const text = replacer(node, typeNode);
                                    return ts.createSourceFile("replaced.ts", text, ts.ScriptTarget.ES2015, false);
                                }
                            });

                            return this;
                        },
                        replaceWithText(toReplace: string) {
                            smallTransforms.push({
                                query: q,
                                transform: (node: ts.Node) => {
                                    return ts.createSourceFile("replaced.ts", toReplace, ts.ScriptTarget.ES2015, false);
                                }
                            });

                            return this;
                        },
                        remove() {
                            smallTransforms.push({
                                query: q,
                                transform: (node: ts.Node) => undefined
                            });

                            return this;
                        },
                    };
                },
            };

            rules.forEach((rule) => rule(tree));

            const visitor = (query: Query, transform: (node: ts.Node) => ts.Node | undefined) => (node: ts.Node): ts.Node | undefined => {
                if (isNodeContains(node, query)) {
                    return transform(node);
                }

                return ts.visitEachChild(node, visitor(query, transform), context);
            };

            return smallTransforms.reduce((acc, { query, transform }) => {
                return ts.visitEachChild(acc, visitor(query, transform), context);
            }, sourceFile);
        };
    };
}

function isNodeContains(node: ts.Node, query: Query): boolean {
    let queryAST = query.queryAST;
    while (queryAST.kind === ts.SyntaxKind.SourceFile || queryAST.kind === ts.SyntaxKind.SyntaxList) {
        queryAST = queryAST.getChildAt(0, query.querySource);
    }

    let nodeAST = node;
    while (nodeAST && (nodeAST.kind === ts.SyntaxKind.SourceFile || nodeAST.kind === ts.SyntaxKind.SyntaxList)) {
        nodeAST = nodeAST.getChildAt(0);  
    }
    
    if (!nodeAST || !queryAST) return false;

    if (nodeAST.kind !== queryAST.kind) return false;

    if (nodeAST.kind === ts.SyntaxKind.Identifier) {
        return nodeAST.getText() === queryAST.getText(query.querySource);
    }

    const matched = queryAST.getChildren(query.querySource).map((child) => {
        const nodeChildrenFiltered = nodeAST.getChildren().filter((nodeChild) => nodeChild.kind === child.kind);
        const matched = nodeChildrenFiltered.map((nodeChild) => {
            return isNodeContains(nodeChild, {
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

function hashNodeType(node: ts.Node): string {
    const fileLocation = node.getSourceFile().fileName;
    const nodeLocation = node.getStart();

    const simpleHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    return simpleHash(`${fileLocation}:${nodeLocation}`).toString(16);
}

export class WildCard {};