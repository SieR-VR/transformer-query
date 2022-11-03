import * as hs from "./Node";
import * as SyntaxKind from "../Tokenizer/SyntaxKind";
import { TokenData } from "../Tokenizer";
import { ParseResult, ParseArrayResult as ArrayResult, ParseStatementResult, ScopeType, ParseTypeResult } from "./Utils";
import { ParsingError, Tail, TailBy, Push } from "../Utils";

export type Parse<TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[]> = 
    ParseSourceFile<TokenList> extends ArrayResult<infer NodeList, infer TokenList, infer Error>
        ? Error extends ParsingError<any>
            ? Error
            : NodeList
        : ParseSourceFile<TokenList>;

export type ParseSourceFile<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[], 
    Result extends hs.Node[] = [],
    Scope extends ScopeType = {},
    NeedSemicolon extends boolean = false,
> = TokenList extends []
    ? ArrayResult<Result, TokenList>
    : TokenList[0] extends SyntaxKind.SemicolonToken<any, any>
    ? ParseSourceFile<Tail<TokenList>, Result, Scope, false>
    : NeedSemicolon extends false
    ? ParseSourceFileHelper<TokenList, Result, Scope>
    : TokenList[0] extends SyntaxKind.TokenSyntaxKind<TokenData<infer LineBreak, any>>
    ? LineBreak extends true
        ? ParseSourceFileHelper<TokenList, Result, Scope>
        : ArrayResult<Result, TokenList, ParsingError<"';' Expected.">>
    : ArrayResult<Result, TokenList, ParsingError<"';' Expected.">>;

export type ParseSourceFileHelper<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[],
    Result extends hs.Node[],
    Scope extends ScopeType
> = ParseStatementHelper<TokenList, false, Scope> extends ParseResult<
        infer Statement,
        infer TokenList,
        infer Error,
        infer Scope
    >
    ? Error extends ParsingError<any>
        ? ArrayResult<Result, TokenList, Error>
        : ParseSourceFile<
            TokenList, 
            Push<Result, Statement>, 
            Scope, 
            true
        >
    : ParseResult<hs.Node, TokenList, ParsingError<"Statement Expected. From ParseSourceFileHelper">, Scope>;

export type ParseStatementHelper<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[],
    IsFunctionScope extends boolean,
    Scope extends ScopeType
> = TokenList extends []
    ? ParseResult<hs.Node, TokenList, null>
    : ParseBlockStatement<TokenList, Scope> extends ParseResult<
        infer Node,
        infer TokenList,
        infer Error,
        infer Scope
    >
    ? Error extends ParsingError<any>
        ? ParseVariableStatement<TokenList, Scope> extends ParseResult<
            infer Node,
            infer TokenList,
            infer Error,
            infer Scope
        > 
            ? Error extends ParsingError<any>
                ? ParseResult<any, any, Error>
                : ParseResult<Node, TokenList, null, Scope>
            : ParseResult<Node, TokenList, Error, Scope>
        : ParseResult<Node, TokenList, Error, Scope>
    : ParseResult<hs.Node, TokenList, ParsingError<"Statement Expected. From ParseStatementHelper">, Scope>;

export type ParseBlockStatement<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[],
    Scope extends ScopeType,
    Result extends hs.Node[] = [],
    NeedSemicolon extends boolean = false,
> = TokenList[0] extends SyntaxKind.OpenBraceToken<any, any>
    ? ParseBlockStatementHelper<Tail<TokenList>, Scope> extends ParseResult<
        infer Node,
        infer TokenList,
        infer Error,
        infer Scope
    >
        ? Error extends ParsingError<any>
            ? ParseResult<any, any, Error>
            : ParseResult<Node, TokenList, Error, Scope>
        : ParseResult<any, TokenList, ParsingError<"Last block statement expected.">, Scope>
    : ParseResult<any, TokenList, ParsingError<"Block statement expected.">, Scope>;

export type ParseBlockStatementHelper<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[],
    Scope extends ScopeType,
    Result extends hs.Statement[] = [],
    NeedSemicolon extends boolean = false,
> = TokenList[0] extends SyntaxKind.CloseBraceToken<any, any>
    ? ParseResult<hs.Block<Result, string>, Tail<TokenList>, null, Scope>
    : ParseStatementHelper<TokenList, false, Scope> extends ParseStatementResult<
        infer Statement,
        infer TokenList,
        infer Error,
        infer Scope
    >
        ? Error extends ParsingError<any>
            ? ParseResult<any, any, Error>
            : ParseBlockStatementHelper<TokenList, Scope, Result> extends ParseStatementResult<
                infer Node,
                infer TokenList,
                infer Error,
                infer Scope
            >
                ? Error extends ParsingError<any>
                    ? ParseResult<any, any, Error>
                    : ParseStatementResult<
                        hs.Block<Push<[Node], Statement>, string>,
                        TokenList,
                        Error,
                        Scope
                    >
                : ParseResult<any, TokenList, ParsingError<"ParseBlockStatementHelper: ParseStatementResult Error.">>
        : ParseResult<any, TokenList, ParsingError<"ParseBlockStatementHelper: ParseStatementResult Error.">>;

export type ParseVariableStatement<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[],
    Scope extends ScopeType = {},
> = TokenList[0] extends SyntaxKind.VarKeyword<any, any>
    ? ParseVariableDeclarationList<Tail<TokenList>, Scope> extends ParseResult<
        infer Node,
        infer TokenList,
        infer Error,
        infer Scope
    > 
        ? Error extends ParsingError<any>
            ? ParseResult<Node, TokenList, Error>
            : Node extends hs.VariableDeclarationList<any, any>
                ? ParseResult<
                    hs.VariableStatement<Node, string>,
                    TokenList,
                    null,
                    Scope
                >
                : ParseResult<any, TokenList, ParsingError<"ParseVariableStatement: Node is not VariableDeclarationList.">>
        : ParseResult<any, TokenList, ParsingError<"ParseVariableStatement: ParseVariableDeclarationList Error.">>
    : ParseResult<any, TokenList, ParsingError<"ParseVariableStatement: 'var' keyword expected.">>;


export type ParseVariableDeclarationList<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[],
    Scope extends ScopeType = {},
    Result extends hs.VariableDeclaration<any, any, any>[] = []
> = TokenList[0] extends SyntaxKind.Identifier<infer Identifier, any>
    ? TokenList[1] extends SyntaxKind.ColonToken<any, any>
        ? ParseTypeNode<TailBy<TokenList, 2>> extends ParseTypeResult<
            infer Type,
            infer TokenList,
            infer Error,
            infer Scope
        >
            ? Error extends ParsingError<any>
                ? ParseResult<Type, TokenList, Error>
                : TokenList[0] extends SyntaxKind.EqualsToken<any, any>
                    ? ParseExpression<Tail<TokenList>, Scope> extends ParseResult<
                        infer Expression,
                        infer TokenList,
                        infer Error,
                        infer Scope
                    >
                        ? Error extends ParsingError<any>
                            ? ParseResult<Expression, TokenList, Error>
                            : TokenList[0] extends SyntaxKind.CommaToken<any, any>
                                ? ParseVariableDeclarationList<
                                    Tail<TokenList>, 
                                    Scope, 
                                    Push<
                                        Result, 
                                        hs.VariableDeclaration<
                                            hs.BindingName<Identifier>, 
                                            Type, 
                                            Expression
                                        >
                                    >
                                >
                                : ParseResult<
                                    hs.VariableDeclarationList<
                                        Push<
                                            Result,
                                            hs.VariableDeclaration<
                                                hs.BindingName<Identifier>,
                                                Type,
                                                Expression
                                            >
                                        >,
                                        string
                                    >,
                                    TokenList,
                                    null,
                                    Scope
                                >
                        : ParseResult<any, TokenList, ParsingError<"ParseVariableDeclarationList: ParseExpression Error.">>
                    : TokenList[0] extends SyntaxKind.CommaToken<any, any>
                        ? ParseVariableDeclarationList<
                            Tail<TokenList>, 
                            Scope, 
                            Push<Result, hs.VariableDeclaration<hs.BindingName<Identifier>, Type, undefined>>
                        >
                        : ParseResult<
                            hs.VariableDeclarationList<
                                Push<
                                    Result,
                                    hs.VariableDeclaration<hs.BindingName<Identifier>, Type, undefined>
                                >,
                                string
                            >,
                            TokenList,
                            null,
                            Scope
                        >
            : ParseResult<any, TokenList, ParsingError<"ParseVariableDeclarationList: ParseTypeNode Error.">>
        : TokenList[1] extends SyntaxKind.EqualsToken<any, any>
            ? ParseExpression<TailBy<TokenList, 2>, Scope> extends ParseResult<
                infer Expression,
                infer TokenList,
                infer Error,
                infer Scope
            >
                ? Error extends ParsingError<any>
                    ? ParseResult<Expression, TokenList, Error>
                    : TokenList[0] extends SyntaxKind.CommaToken<any, any>
                        ? ParseVariableDeclarationList<Tail<TokenList>, Scope, Push<Result, hs.VariableDeclaration<hs.BindingName<Identifier>, undefined, Expression>>>
                        : ParseResult<
                            hs.VariableDeclarationList<
                                Push<
                                    Result,
                                    hs.VariableDeclaration<hs.BindingName<Identifier>, undefined, Expression>
                                >,
                                string
                            >,
                            TokenList,
                            null,
                            Scope
                        >
                : ParseResult<any, TokenList, ParsingError<"ParseVariableDeclarationList: ParseExpression Error.">>
            : TokenList[1] extends SyntaxKind.CommaToken<any, any>
                ? ParseVariableDeclarationList<Tail<TokenList>, Scope, Result>
                : ParseResult<
                    hs.VariableDeclarationList<Push<
                        Result,
                        hs.VariableDeclaration<hs.BindingName<Identifier>, undefined, undefined>
                    >, string>,
                    TokenList,
                    null,
                    Scope
                >
    : ParseResult<any, TokenList, ParsingError<"ParseVariableDeclarationList: ParseExpression Error.">>;

export type ParseTypeNode<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[],
> = TokenList[0] extends SyntaxKind.AnyKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"any">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.BooleanKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"boolean">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.NumberKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"number">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.StringKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"string">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.VoidKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"void">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.BigIntKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"bigint">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.SymbolKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"symbol">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.IntrinsicKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"intrinsic">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.UnknownKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"unknown">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.NeverKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"never">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.UndefinedKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"undefined">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.ObjectKeyword<any, any>
    ? ParseResult<hs.KeywordTypeNode<"object">, Tail<TokenList>>
    : TokenList[0] extends SyntaxKind.Identifier<infer Identifier, any>
    ? ParseResult<hs.TypeNode<Identifier>, Tail<TokenList>>
    : ParseResult<any, TokenList, ParsingError<"ParseTypeNode: ParseExpression Error.">>;

export type ParseExpression<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[],
    Scope extends ScopeType,
> = TokenList[0] extends SyntaxKind.Identifier<infer Identifier, any>
    ? ParseResult<
        hs.Expression<[hs.Identifier<Identifier>], Identifier>, 
        Tail<TokenList>, 
        null, 
        Scope
    >
    : never;