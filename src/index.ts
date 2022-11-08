import ts from "typescript";
import * as path from "path";

import { PluginConfig } from "./pluginConfig";

export class Source<T extends ts.Node = ts.Node> {
    static sourceFile: ts.SourceFile;
    
    readonly node: T;
    private readonly context: ts.TransformationContext;
    private readonly checker: ts.TypeChecker;

    constructor(
        node: T,
        context: ts.TransformationContext,
        checker: ts.TypeChecker,
    ) {
        this.node = node;
        this.context = context;
        this.checker = checker;

        this.query = this.makeQuery();
    }

    private makeQuery(): (query: Tree) => SourceList {
        return (query) => {
            let result = new SourceList();

            ts.visitEachChild(
                this.node,
                this.makeVisitor((node) => {
                    result.push(new Source(node, this.context, this.checker));
                    return node;
                }, query),
                this.context
            );

            return result;
        }
    }

    private makeVisitor(transform: (node: ts.Node) => ts.Node | undefined, query: Tree): ts.Visitor {
        return (node) => {
            if (isNodeContains(this.checker, new Tree(node, Source.sourceFile), query)) {
                return transform(node);
            }

            return ts.visitEachChild(node, this.makeVisitor(transform, query), this.context);
        }
    }

    private makeExactVisitor(transform: (node: ts.Node) => ts.Node | undefined, exactNode: ts.Node): ts.Visitor {
        return (node) => {
            if (node === exactNode) {
                return transform(node);
            }

            return ts.visitEachChild(node, this.makeExactVisitor(transform, exactNode), this.context);
        }
    }

    query: (query: Tree) => SourceList;

    replace(replacer: (node: ts.Node) => ts.Node): Source<T> {
        Source.sourceFile = ts.visitEachChild(Source.sourceFile, this.makeExactVisitor(replacer, this.node), this.context);
        return this;
    }

    replaceWith(toReplace: ts.Node): Source<T> {
        Source.sourceFile = ts.visitEachChild(Source.sourceFile, this.makeExactVisitor((_) => toReplace, this.node), this.context);
        return this;
    }

    replaceText(replacer: (node: ts.Node) => string): Source<T> {
        Source.sourceFile = ts.visitEachChild(
            Source.sourceFile, 
            this.makeExactVisitor((node) => ts.createSourceFile("toReplace.ts", replacer(node), ts.ScriptTarget.Latest), this.node),
            this.context
        );

        return this;
    }

    replaceWithText(toReplace: string): Source<T> {
        const toReplaceNode = ts.createSourceFile("toReplace.ts", toReplace, ts.ScriptTarget.Latest);
        Source.sourceFile = ts.visitEachChild(
            Source.sourceFile,
            this.makeExactVisitor((_) => toReplaceNode, this.node),
            this.context
        );

        return this;
    }

    remove(): void {
        Source.sourceFile = ts.visitEachChild(
            Source.sourceFile,
            this.makeExactVisitor((_) => undefined, this.node),
            this.context
        );
    }

    then<R>(transform: (source: Source<T>) => R): R {
        return transform(this);
    }
}

export class SourceList<T extends ts.Node = ts.Node> extends Array<Source<T>> {
    constructor(...sources: Source<T>[]) {
        super(...sources);
    }

    query(query: Tree): SourceList {
        let result = new SourceList();

        this.forEach(source => {
            result.push(...source.query(query));
        });

        return result;
    }

    replace(replacer: (node: ts.Node) => ts.Node): SourceList<T> {
        this.forEach(source => source.replace(replacer));
        return this;
    }

    replaceWith(toReplace: ts.Node): SourceList<T> {
        this.forEach(source => source.replaceWith(toReplace));
        return this;
    }

    replaceText(replacer: (node: ts.Node) => string): SourceList<T> {
        this.forEach(source => source.replaceText(replacer));
        return this;
    }

    replaceWithText(toReplace: string): SourceList<T> {
        this.forEach(source => source.replaceWithText(toReplace));
        return this;
    }

    remove(): void {
        this.forEach(source => source.remove());
    }

    then<R>(transform: (source: SourceList<T>) => R): R {
        return transform(this);
    }
}

export class Tree {
    readonly ast: ts.Node;
    readonly sourceFile: ts.SourceFile;

    constructor(ast: ts.Node, sourceFile: ts.SourceFile) {
        this.ast = ast;
        this.sourceFile = sourceFile;
    }

    getText(): string {
        return this.ast.getText(this.sourceFile);
    }

    get kind(): ts.SyntaxKind {
        return this.ast.kind;
    }

    getHash(checker: ts.TypeChecker): string {
        let symbol = checker.getSymbolAtLocation(this.ast);
        if (!symbol)
            throw new Error("No symbol found for node");

        let tempSymbol = symbol;

        try { symbol = checker.getAliasedSymbol(symbol); }
        catch (e) { symbol = tempSymbol; }

        if (!symbol.declarations)
            throw new Error("No declarations found for symbol");

        const originalDeclaration = symbol.declarations[0];
        const fileLocation = originalDeclaration.getSourceFile().fileName;

        const relative = path.relative(process.cwd(), fileLocation);
        const nodeText = this.ast.getText(this.sourceFile);

        return simpleHash(`${relative}:${nodeText}`);
    }

    getChildren(): Tree[] {
        return this.ast.getChildren(this.sourceFile).map(child => new Tree(child, this.sourceFile));
    }
}

export function q(strings: TemplateStringsArray, ...userMatches: any[]): Tree {
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

        if (match === TemplateLiteral) {
            return "`__TEMPLATE_LITERAL__`";
        }

        return match;
    });

    const original = strings.reduce((acc, str, i) => {
        return acc + str + (hashes[i] || "");
    }, "");

    const ast = ts.createSourceFile("query.ts", original, ts.ScriptTarget.Latest, false);

    let queryable: ts.Node = ast;
    const notQueryables = new Set<ts.SyntaxKind>([
        ts.SyntaxKind.SourceFile,
        ts.SyntaxKind.SyntaxList,
        ts.SyntaxKind.ExpressionStatement,
    ]);

    while (notQueryables.has(queryable.kind)) {
        queryable = queryable.getChildAt(0, ast);
    }

    return new Tree(queryable, ast);
}

export function makeTransform(
    rules: Array<(src: Source, checker: ts.TypeChecker) => void>,
): (program: ts.Program, pluginConfig: PluginConfig) => (context: ts.TransformationContext) => ts.Transformer<ts.SourceFile> {
    return (program, pluginConfig) => (context: ts.TransformationContext) => {
        const checker = program.getTypeChecker();

        return (sourceFile: ts.SourceFile) => {
            Source.sourceFile = sourceFile;
            const src: Source<ts.SourceFile> = new Source(sourceFile, context, checker);

            rules.forEach((rule) => rule(src, checker));
            
            return Source.sourceFile;
        };
    };
}

function isNodeContains(checker: ts.TypeChecker, source: Tree, query: Tree): boolean {
    if (ts.isIdentifier(source.ast) && ts.isIdentifier(query.ast)) {
        const queryIdentifier = query.getText();
        if (queryIdentifier.startsWith("_$") && queryIdentifier.endsWith("$_"))
            return queryIdentifier === source.getHash(checker);

        return (source.getText() === query.getText()) || (queryIdentifier === "__IDENTIFIER__");
    }

    if (ts.isStringLiteral(source.ast) && ts.isStringLiteral(query.ast)) {
        return (source.getText() === query.getText()) || (query.getText() === "\"__STRING_LITERAL__\"");
    }

    if (ts.isNumericLiteral(source.ast) && ts.isNumericLiteral(query.ast)) {
        return (source.getText() === query.getText()) || (query.getText() === "0xC_0_F_F_E_E");
    }

    if (ts.isTemplateLiteral(source.ast) && ts.isTemplateLiteral(query.ast)) {
        if (query.getText() === "`__TEMPLATE_LITERAL__`")
            return true;
    }

    if (source.kind !== query.kind) return false;

    const matched = query.getChildren().map((child) => {
        const matched = source.getChildren().map((nodeChild) => {
            return isNodeContains(checker, nodeChild, child);
        });

        if (!matched.length || matched.some((m) => m)) {
            return true;
        }

        return false;
    });

    const result = !matched.length || matched.every((m) => m);
    return result;
}

export function simpleHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return `_$${Math.abs(hash).toString(16)}$_`;
}

export class Identifier { };
export class StringLiteral { };
export class NumericLiteral { };
export class TemplateLiteral { };

type InternalWildcard =
    | typeof Identifier
    | typeof StringLiteral
    | typeof NumericLiteral
    | typeof TemplateLiteral;