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
    replace(replacer: (node: ts.Node, typeNode: ts.Type) => ts.Node): void;
    replaceWith(toReplace: ts.Node): void;
    remove(): void;
}

export function q(strings: TemplateStringsArray, _hashes?: any[]): Query {
    const hashes = _hashes as string[] || [];

    const original = strings.reduce((acc, str, i) => {
        return acc + str + (hashes[i] || "");
    }, "");

    const ast = ts.createSourceFile("query.ts", original, ts.ScriptTarget.Latest, false);

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
                        ast: q.queryAST,
                        query: q.querySource,
                        replace(replacer: (node: ts.Node, typeNode: ts.Type) => ts.Node) {
                            smallTransforms.push({
                                query: q,
                                transform: (node: ts.Node) => {
                                    const typeNode = checker.getTypeAtLocation(node);
                                    return replacer(node, typeNode);
                                }
                            });
                        },
                        replaceWith(toReplace: ts.Node) {
                            smallTransforms.push({
                                query: q,
                                transform: (node: ts.Node) => toReplace
                            });
                        },
                        remove() {
                            smallTransforms.push({
                                query: q,
                                transform: (node: ts.Node) => undefined
                            });
                        },
                    };
                },
            };

            rules.forEach((rule) => rule(tree));

            const a = ts.visitEachChild(sourceFile, (node) => {
                const smallTransform = smallTransforms.find((transform) =>{
                    const b = isNodeContains(node, transform.query);
                    return b;
                });

                if (smallTransform) {
                    return smallTransform.transform(node);
                }

                // console.log(ts.SyntaxKind[node.kind], node.getText());

                return ts.visitEachChild(node, (node) => {
                    const smallTransform = smallTransforms.find((transform) =>{
                        const b = isNodeContains(node, transform.query);
                        return b;
                    });

                    if (smallTransform) {
                        return smallTransform.transform(node);
                    }

                    return node;
                }, context);
            }, context);

            return a;
        };
    };
}

function isNodeContains(node: ts.Node, query: Query): boolean {
    let queryAST = query.queryAST;
    while (queryAST.kind === ts.SyntaxKind.SourceFile || queryAST.kind === ts.SyntaxKind.SyntaxList) {
        queryAST = queryAST.getChildAt(0, query.querySource);
    }

    if (node.kind !== queryAST.kind) {
        return false;
    }

    const matched = queryAST.getChildren(query.querySource).map((child) => {
        const nodeChildrenFiltered = node.getChildren().filter((nodeChild) => nodeChild.kind === child.kind);
        const matched = nodeChildrenFiltered.map((nodeChild) => {
            return isNodeContains(nodeChild, {
                queryAST: child,
                querySource: query.querySource,
            })
        });

        if (matched.some((m) => m)) {
            return true;
        }

        return false;
    });

    console.log(matched);

    return !matched.length || matched.some((m) => m);
}

function hashNodeType(checker: ts.TypeChecker, node: ts.Node): string {
    return node.getSourceFile().fileName;
}