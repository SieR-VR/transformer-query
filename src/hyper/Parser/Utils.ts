import { TokenSyntaxKind } from "../Tokenizer/SyntaxKind";
import { ParsingError } from "../Utils";
import * as hs from "./Node";

export type ParseResult<
    Node extends hs.Node,
    TokenList extends Array<TokenSyntaxKind<any, any>>,
    Error extends ParsingError<any> | null = null,
    Scope extends ScopeType = {},
> = {
    node: Node;
    tokenList: TokenList;
    error: Error;
    scope: Scope;
}

export type ParseArrayResult<
    NodeList extends Array<hs.Node>,
    TokenList extends Array<TokenSyntaxKind<any, any>>,
    Error extends ParsingError<any> | null = null,
    Scope extends ScopeType = {},
> = {
    node: NodeList;
    tokenList: TokenList;
    error: Error;
    scope: Scope;
}

export type ParseStatementResult<
    Node extends hs.Statement,
    TokenList extends Array<TokenSyntaxKind<any, any>>,
    Error extends ParsingError<any> | null = null,
    Scope extends ScopeType = {},
> = {
    node: Node;
    tokenList: TokenList;
    error: Error;
    scope: Scope;
}

export type ParseTypeResult<
    Node extends hs.TypeNode<string>,
    TokenList extends Array<TokenSyntaxKind<any, any>>,
    Error extends ParsingError<any> | null = null,
    Scope extends ScopeType = {},
> = {
    node: Node;
    tokenList: TokenList;
    error: Error;
    scope: Scope;
}

export type ScopeType = Record<string, boolean>