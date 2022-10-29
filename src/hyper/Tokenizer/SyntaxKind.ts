import ts from "typescript";
import type { TokenData } from ".";

export type Unknown<
    Value extends string,
    Data extends TokenData
> = {
    type: "unknown";
    kind: ts.SyntaxKind.Unknown;
    value: Value;
    data: Data;
}

export type EndOfFileToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "endOfFile";
    kind: ts.SyntaxKind.EndOfFileToken;
    value: Value;
    data: Data;
}

export type SingleLineCommentTrivia<
    Value extends string,
    Data extends TokenData
> = {
    type: "singleLineCommentTrivia";
    kind: ts.SyntaxKind.SingleLineCommentTrivia;
    value: Value;
    data: Data;
}

export type MultiLineCommentTrivia<
    Value extends string,
    Data extends TokenData
> = {
    type: "multiLineCommentTrivia";
    kind: ts.SyntaxKind.MultiLineCommentTrivia;
    value: Value;
    data: Data;
}

export type NewLineTrivia<
    Value extends string,
    Data extends TokenData
> = {
    type: "newLineTrivia";
    kind: ts.SyntaxKind.NewLineTrivia;
    value: Value;
    data: Data;
}

export type WhitespaceTrivia<
    Value extends string,
    Data extends TokenData
> = {
    type: "whitespaceTrivia";
    kind: ts.SyntaxKind.WhitespaceTrivia;
    value: Value;
    data: Data;
}

export type ShebangTrivia<
    Value extends string,
    Data extends TokenData
> = {
    type: "shebangTrivia";
    kind: ts.SyntaxKind.ShebangTrivia;
    value: Value;
    data: Data;
}

export type ConflictMarkerTrivia<
    Value extends string,
    Data extends TokenData
> = {
    type: "conflictMarkerTrivia";
    kind: ts.SyntaxKind.ConflictMarkerTrivia;
    value: Value;
    data: Data;
}

export type TriviaSyntaxKind<
    Value extends string,
    Data extends TokenData
> = | SingleLineCommentTrivia<Value, Data>
    | MultiLineCommentTrivia<Value, Data>
    | NewLineTrivia<Value, Data>
    | WhitespaceTrivia<Value, Data>
    | ShebangTrivia<Value, Data>
    | ConflictMarkerTrivia<Value, Data>;

export type NumericLiteral<
    Value extends string,
    Data extends TokenData
> = {
    type: "numericLiteral";
    kind: ts.SyntaxKind.NumericLiteral;
    value: Value;
    data: Data;
}

export type BigIntLiteral<
    Value extends string,
    Data extends TokenData
> = {
    type: "bigIntLiteral";
    kind: ts.SyntaxKind.BigIntLiteral;
    value: Value;
    data: Data;
}

export type StringLiteral<
    Value extends string,
    Data extends TokenData
> = {
    type: "stringLiteral";
    kind: ts.SyntaxKind.StringLiteral;
    value: Value;
    data: Data;
}

export type JsxText<
    Value extends string,
    Data extends TokenData
> = {
    type: "jsxText";
    kind: ts.SyntaxKind.JsxText;
    value: Value;
    data: Data;
}

export type JsxTextAllWhiteSpaces<
    Value extends string,
    Data extends TokenData
> = {
    type: "jsxTextAllWhiteSpaces";
    kind: ts.SyntaxKind.JsxTextAllWhiteSpaces;
    value: Value;
    data: Data;
}

export type RegularExpressionLiteral<
    Value extends string,
    Data extends TokenData
> = {
    type: "regularExpressionLiteral";
    kind: ts.SyntaxKind.RegularExpressionLiteral;
    value: Value;
    data: Data;
}

export type NoSubstitutionTemplateLiteral<
    Value extends string,
    Data extends TokenData
> = {
    type: "noSubstitutionTemplateLiteral";
    kind: ts.SyntaxKind.NoSubstitutionTemplateLiteral;
    value: Value;
    data: Data;
}

export type LiteralSyntaxKind<
    Value extends string,
    Data extends TokenData
> = | NumericLiteral<Value, Data>
    | BigIntLiteral<Value, Data>
    | StringLiteral<Value, Data>
    | JsxText<Value, Data>
    | JsxTextAllWhiteSpaces<Value, Data>
    | RegularExpressionLiteral<Value, Data>
    | NoSubstitutionTemplateLiteral<Value, Data>;

export type TemplateHead<
    Value extends string,
    Data extends TokenData
> = {
    type: "templateHead";
    kind: ts.SyntaxKind.TemplateHead;
    value: Value;
    data: Data;
}

export type TemplateMiddle<
    Value extends string,
    Data extends TokenData
> = {
    type: "templateMiddle";
    kind: ts.SyntaxKind.TemplateMiddle;
    value: Value;
    data: Data;
}

export type TemplateTail<
    Value extends string,
    Data extends TokenData
> = {
    type: "templateTail";
    kind: ts.SyntaxKind.TemplateTail;
    value: Value;
    data: Data;
}

export type PseudoLiteralSyntaxKind<
    Value extends string,
    Data extends TokenData
> = | TemplateHead<Value, Data>
    | TemplateMiddle<Value, Data>
    | TemplateTail<Value, Data>;

export type OpenBraceToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "openBraceToken";
    kind: ts.SyntaxKind.OpenBraceToken;
    value: Value;
    data: Data;

    token: "{";
}

export type CloseBraceToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "closeBraceToken";
    kind: ts.SyntaxKind.CloseBraceToken;
    value: Value;
    data: Data;

    token: "}";
}

export type OpenParenToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "openParenToken";
    kind: ts.SyntaxKind.OpenParenToken;
    value: Value;
    data: Data;

    token: "(";
}

export type CloseParenToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "closeParenToken";
    kind: ts.SyntaxKind.CloseParenToken;
    value: Value;
    data: Data;

    token: ")";
}

export type OpenBracketToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "openBracketToken";
    kind: ts.SyntaxKind.OpenBracketToken;
    value: Value;
    data: Data;

    token: "[";
}

export type CloseBracketToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "closeBracketToken";
    kind: ts.SyntaxKind.CloseBracketToken;
    value: Value;
    data: Data;

    token: "]";
}

export type DotToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "dotToken";
    kind: ts.SyntaxKind.DotToken;
    value: Value;
    data: Data;

    token: ".";
}

export type DotDotDotToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "dotDotDotToken";
    kind: ts.SyntaxKind.DotDotDotToken;
    value: Value;
    data: Data;

    token: "...";
}

export type SemicolonToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "semicolonToken";
    kind: ts.SyntaxKind.SemicolonToken;
    value: Value;
    data: Data;

    token: ";";
}

export type CommaToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "commaToken";
    kind: ts.SyntaxKind.CommaToken;
    value: Value;
    data: Data;

    token: ",";
}

export type QuestionDotToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "questionDotToken";
    kind: ts.SyntaxKind.QuestionDotToken;
    value: Value;
    data: Data;

    token: "?.";
}

export type LessThanToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "lessThanToken";
    kind: ts.SyntaxKind.LessThanToken;
    value: Value;
    data: Data;

    token: "<";
}

export type LessThanSlashToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "lessThanSlashToken";
    kind: ts.SyntaxKind.LessThanSlashToken;
    value: Value;
    data: Data;

    token: "</";
}

export type GreaterThanToken<
    Value extends string,
    Data extends TokenData  
> = {
    type: "greaterThanToken";
    kind: ts.SyntaxKind.GreaterThanToken;
    value: Value;
    data: Data;

    token: ">";
}

export type LessThanEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "lessThanEqualsToken";
    kind: ts.SyntaxKind.LessThanEqualsToken;
    value: Value;
    data: Data;

    token: "<=";
}

export type GreaterThanEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "greaterThanEqualsToken";
    kind: ts.SyntaxKind.GreaterThanEqualsToken;
    value: Value;
    data: Data;

    token: ">=";
}

export type EqualsEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "equalsEqualsToken";
    kind: ts.SyntaxKind.EqualsEqualsToken;
    value: Value;
    data: Data;

    token: "==";
}

export type ExclamationEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "exclamationEqualsToken";
    kind: ts.SyntaxKind.ExclamationEqualsToken;
    value: Value;
    data: Data;

    token: "!=";
}

export type EqualsEqualsEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "equalsEqualsEqualsToken";
    kind: ts.SyntaxKind.EqualsEqualsEqualsToken;
    value: Value;
    data: Data;

    token: "===";
}

export type ExclamationEqualsEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "exclamationEqualsEqualsToken";
    kind: ts.SyntaxKind.ExclamationEqualsEqualsToken;
    value: Value;
    data: Data;

    token: "!==";
}

export type EqualsGreaterThanToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "equalsGreaterThanToken";
    kind: ts.SyntaxKind.EqualsGreaterThanToken;
    value: Value;
    data: Data;

    token: "=>";
}

export type PlusToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "plusToken";
    kind: ts.SyntaxKind.PlusToken;
    value: Value;
    data: Data;

    token: "+";
}

export type MinusToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "minusToken";
    kind: ts.SyntaxKind.MinusToken;
    value: Value;
    data: Data;

    token: "-";
}

export type AsteriskToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "asteriskToken";
    kind: ts.SyntaxKind.AsteriskToken;
    value: Value;
    data: Data;

    token: "*";
}

export type AsteriskAsteriskToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "asteriskAsteriskToken";
    kind: ts.SyntaxKind.AsteriskAsteriskToken;
    value: Value;
    data: Data;

    token: "**";
}

export type SlashToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "slashToken";
    kind: ts.SyntaxKind.SlashToken;
    value: Value;
    data: Data;

    token: "/";
}

export type PercentToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "percentToken";
    kind: ts.SyntaxKind.PercentToken;
    value: Value;
    data: Data;

    token: "%";
}

export type PlusPlusToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "plusPlusToken";
    kind: ts.SyntaxKind.PlusPlusToken;
    value: Value;
    data: Data;

    token: "++";
}

export type MinusMinusToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "minusMinusToken";
    kind: ts.SyntaxKind.MinusMinusToken;
    value: Value;
    data: Data;

    token: "--";
}

export type LessThanLessThanToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "lessThanLessThanToken";
    kind: ts.SyntaxKind.LessThanLessThanToken;
    value: Value;
    data: Data;

    token: "<<";
}

export type GreaterThanGreaterThanToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "greaterThanGreaterThanToken";
    kind: ts.SyntaxKind.GreaterThanGreaterThanToken;
    value: Value;
    data: Data;

    token: ">>";
}

export type GreaterThanGreaterThanGreaterThanToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "greaterThanGreaterThanGreaterThanToken";
    kind: ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
    value: Value;
    data: Data;

    token: ">>>";
}

export type AmpersandToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "ampersandToken";
    kind: ts.SyntaxKind.AmpersandToken;
    value: Value;
    data: Data;

    token: "&";
}

export type BarToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "barToken";
    kind: ts.SyntaxKind.BarToken;
    value: Value;
    data: Data;

    token: "|";
}

export type CaretToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "caretToken";
    kind: ts.SyntaxKind.CaretToken;
    value: Value;
    data: Data;

    token: "^";
}

export type ExclamationToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "exclamationToken";
    kind: ts.SyntaxKind.ExclamationToken;
    value: Value;
    data: Data;

    token: "!";
}

export type TildeToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "tildeToken";
    kind: ts.SyntaxKind.TildeToken;
    value: Value;
    data: Data;

    token: "~";
}

export type AmpersandAmpersandToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "ampersandAmpersandToken";
    kind: ts.SyntaxKind.AmpersandAmpersandToken;
    value: Value;
    data: Data;

    token: "&&";
}

export type BarBarToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "barBarToken";
    kind: ts.SyntaxKind.BarBarToken;
    value: Value;
    data: Data;

    token: "||";
}

export type QuestionQuestionToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "questionQuestionToken";
    kind: ts.SyntaxKind.QuestionQuestionToken;
    value: Value;
    data: Data;

    token: "??";
}

export type QuestionToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "questionToken";
    kind: ts.SyntaxKind.QuestionToken;
    value: Value;
    data: Data;

    token: "?";
}

export type ColonToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "colonToken";
    kind: ts.SyntaxKind.ColonToken;
    value: Value;
    data: Data;

    token: ":";
}

export type AtToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "atToken";
    kind: ts.SyntaxKind.AtToken;
    value: Value;
    data: Data;

    token: "@";
}

export type BacktickToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "backtickToken";
    kind: ts.SyntaxKind.BacktickToken;
    value: Value;
    data: Data;

    token: "`";
}

export type HashToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "hashToken";
    kind: ts.SyntaxKind.HashToken;
    value: Value;
    data: Data;

    token: "#";
}

export type EqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "equalsToken";
    kind: ts.SyntaxKind.EqualsToken;
    value: Value;
    data: Data;

    token: "=";
}

export type PlusEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "plusEqualsToken";
    kind: ts.SyntaxKind.PlusEqualsToken;
    value: Value;
    data: Data;

    token: "+=";
}

export type MinusEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "minusEqualsToken";
    kind: ts.SyntaxKind.MinusEqualsToken;
    value: Value;
    data: Data;

    token: "-=";
}

export type AsteriskEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "asteriskEqualsToken";
    kind: ts.SyntaxKind.AsteriskEqualsToken;
    value: Value;
    data: Data;

    token: "*=";
}

export type AsteriskAsteriskEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "asteriskAsteriskEqualsToken";
    kind: ts.SyntaxKind.AsteriskAsteriskEqualsToken;
    value: Value;
    data: Data;

    token: "**=";
}

export type SlashEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "slashEqualsToken";
    kind: ts.SyntaxKind.SlashEqualsToken;
    value: Value;
    data: Data;

    token: "/=";
}

export type PercentEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "percentEqualsToken";
    kind: ts.SyntaxKind.PercentEqualsToken;
    value: Value;
    data: Data;

    token: "%=";
}

export type LessThanLessThanEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "lessThanLessThanEqualsToken";
    kind: ts.SyntaxKind.LessThanLessThanEqualsToken;
    value: Value;
    data: Data;

    token: "<<=";
}

export type GreaterThanGreaterThanEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "greaterThanGreaterThanEqualsToken";
    kind: ts.SyntaxKind.GreaterThanGreaterThanEqualsToken;
    value: Value;
    data: Data;

    token: ">>=";
}

export type GreaterThanGreaterThanGreaterThanEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "greaterThanGreaterThanGreaterThanEqualsToken";
    kind: ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken;
    value: Value;
    data: Data;

    token: ">>>=";
}

export type AmpersandEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "ampersandEqualsToken";
    kind: ts.SyntaxKind.AmpersandEqualsToken;
    value: Value;
    data: Data;

    token: "&=";
}

export type BarEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "barEqualsToken";
    kind: ts.SyntaxKind.BarEqualsToken;
    value: Value;
    data: Data;

    token: "|=";
}

export type CaretEqualsToken<
    Value extends string,
    Data extends TokenData
> = {
    type: "caretEqualsToken";
    kind: ts.SyntaxKind.CaretEqualsToken;
    value: Value;
    data: Data;

    token: "^=";
}

export type PunctuationSyntaxKind<
    Value extends string,
    Data extends TokenData
> = | OpenBraceToken<Value, Data>
    | CloseBraceToken<Value, Data>
    | OpenParenToken<Value, Data>
    | CloseParenToken<Value, Data>
    | OpenBracketToken<Value, Data>
    | CloseBracketToken<Value, Data>
    | DotToken<Value, Data>
    | DotDotDotToken<Value, Data>
    | SemicolonToken<Value, Data>
    | CommaToken<Value, Data>
    | QuestionDotToken<Value, Data>
    | LessThanToken<Value, Data>
    | LessThanSlashToken<Value, Data>
    | GreaterThanToken<Value, Data>
    | LessThanEqualsToken<Value, Data>
    | GreaterThanEqualsToken<Value, Data>
    | EqualsEqualsToken<Value, Data>
    | ExclamationEqualsToken<Value, Data>
    | EqualsEqualsEqualsToken<Value, Data>
    | ExclamationEqualsEqualsToken<Value, Data>
    | EqualsGreaterThanToken<Value, Data>
    | PlusToken<Value, Data>
    | MinusToken<Value, Data>
    | AsteriskToken<Value, Data>
    | AsteriskAsteriskToken<Value, Data>
    | SlashToken<Value, Data>
    | PercentToken<Value, Data>
    | PlusPlusToken<Value, Data>
    | MinusMinusToken<Value, Data>
    | LessThanLessThanToken<Value, Data>
    | GreaterThanGreaterThanToken<Value, Data>
    | GreaterThanGreaterThanGreaterThanToken<Value, Data>
    | AmpersandToken<Value, Data>
    | BarToken<Value, Data>
    | CaretToken<Value, Data>
    | ExclamationToken<Value, Data>
    | TildeToken<Value, Data>
    | AmpersandAmpersandToken<Value, Data>
    | BarBarToken<Value, Data>
    | QuestionQuestionToken<Value, Data>
    | QuestionToken<Value, Data>
    | ColonToken<Value, Data>
    | AtToken<Value, Data>
    | BacktickToken<Value, Data>
    | HashToken<Value, Data>
    | EqualsToken<Value, Data>
    | PlusEqualsToken<Value, Data>
    | MinusEqualsToken<Value, Data>
    | AsteriskEqualsToken<Value, Data>
    | AsteriskAsteriskEqualsToken<Value, Data>
    | SlashEqualsToken<Value, Data>
    | PercentEqualsToken<Value, Data>
    | LessThanLessThanEqualsToken<Value, Data>
    | GreaterThanGreaterThanEqualsToken<Value, Data>
    | GreaterThanGreaterThanGreaterThanEqualsToken<Value, Data>
    | AmpersandEqualsToken<Value, Data>
    | BarEqualsToken<Value, Data>
    | CaretEqualsToken<Value, Data>;

export type PunctuationTokenMap<
    Value extends string,
    Data extends TokenData
> = {
    "{" : OpenBraceToken<Value, Data>;
    "}" : CloseBraceToken<Value, Data>;
    "(" : OpenParenToken<Value, Data>;
    ")" : CloseParenToken<Value, Data>;
    "[" : OpenBracketToken<Value, Data>;
    "]" : CloseBracketToken<Value, Data>;
    "." : DotToken<Value, Data>;
    "..." : DotDotDotToken<Value, Data>;
    ";" : SemicolonToken<Value, Data>;
    "," : CommaToken<Value, Data>;
    "?." : QuestionDotToken<Value, Data>;
    "<" : LessThanToken<Value, Data>;
    "</" : LessThanSlashToken<Value, Data>;
    ">" : GreaterThanToken<Value, Data>;
    "<=" : LessThanEqualsToken<Value, Data>;
    ">=" : GreaterThanEqualsToken<Value, Data>;
    "==" : EqualsEqualsToken<Value, Data>;
    "!=" : ExclamationEqualsToken<Value, Data>;
    "===" : EqualsEqualsEqualsToken<Value, Data>;
    "!==" : ExclamationEqualsEqualsToken<Value, Data>;
    "=>" : EqualsGreaterThanToken<Value, Data>;
    "+" : PlusToken<Value, Data>;
    "-" : MinusToken<Value, Data>;
    "*" : AsteriskToken<Value, Data>;
    "**" : AsteriskAsteriskToken<Value, Data>;
    "/" : SlashToken<Value, Data>;
    "%" : PercentToken<Value, Data>;
    "++" : PlusPlusToken<Value, Data>;
    "--" : MinusMinusToken<Value, Data>;
    "<<" : LessThanLessThanToken<Value, Data>;
    ">>" : GreaterThanGreaterThanToken<Value, Data>;
    ">>>" : GreaterThanGreaterThanGreaterThanToken<Value, Data>;
    "&" : AmpersandToken<Value, Data>;
    "|" : BarToken<Value, Data>;
    "^" : CaretToken<Value, Data>;
    "!" : ExclamationToken<Value, Data>;
    "~" : TildeToken<Value, Data>;
    "&&" : AmpersandAmpersandToken<Value, Data>;
    "||" : BarBarToken<Value, Data>;
    "??": QuestionQuestionToken<Value, Data>;
    "?" : QuestionToken<Value, Data>;
    ":" : ColonToken<Value, Data>;
    "@" : AtToken<Value, Data>;
    "`" : BacktickToken<Value, Data>;
    "#" : HashToken<Value, Data>;
    "=" : EqualsToken<Value, Data>;
    "+=" : PlusEqualsToken<Value, Data>;
    "-=" : MinusEqualsToken<Value, Data>;
    "*=" : AsteriskEqualsToken<Value, Data>;
    "**=" : AsteriskAsteriskEqualsToken<Value, Data>;
    "/=" : SlashEqualsToken<Value, Data>;
    "%=" : PercentEqualsToken<Value, Data>;
    "<<=" : LessThanLessThanEqualsToken<Value, Data>;
    ">>=" : GreaterThanGreaterThanEqualsToken<Value, Data>;
    ">>>=" : GreaterThanGreaterThanGreaterThanEqualsToken<Value, Data>;
    "&=" : AmpersandEqualsToken<Value, Data>;
    "|=" : BarEqualsToken<Value, Data>;
    "^=" : CaretEqualsToken<Value, Data>;
};

export type AbstractKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "abstractKeyword";
    kind: ts.SyntaxKind.AbstractKeyword;
    value: Value;
    data: Data;
}

export type AnyKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "anyKeyword";
    kind: ts.SyntaxKind.AnyKeyword;
    value: Value;
    data: Data;
}

export type AsKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "asKeyword";
    kind: ts.SyntaxKind.AsKeyword;
    value: Value;
    data: Data;
}

export type AssertsKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "assertsKeyword";
    kind: ts.SyntaxKind.AssertsKeyword;
    value: Value;
    data: Data;
}

export type AssertKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "assertKeyword";
    kind: ts.SyntaxKind.AssertKeyword;
    value: Value;
    data: Data;
}

export type AsyncKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "asyncKeyword";
    kind: ts.SyntaxKind.AsyncKeyword;
    value: Value;
    data: Data;
}

export type AwaitKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "awaitKeyword";
    kind: ts.SyntaxKind.AwaitKeyword;
    value: Value;
    data: Data;
}

export type BigIntKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "bigIntKeyword";
    kind: ts.SyntaxKind.BigIntKeyword;
    value: Value;
    data: Data;
}

export type BooleanKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "booleanKeyword";
    kind: ts.SyntaxKind.BooleanKeyword;
    value: Value;
    data: Data;
}

export type BreakKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "breakKeyword";
    kind: ts.SyntaxKind.BreakKeyword;
    value: Value;
    data: Data;
}

export type CaseKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "caseKeyword";
    kind: ts.SyntaxKind.CaseKeyword;
    value: Value;
    data: Data;
}

export type CatchKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "catchKeyword";
    kind: ts.SyntaxKind.CatchKeyword;
    value: Value;
    data: Data;
}

export type ClassKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "classKeyword";
    kind: ts.SyntaxKind.ClassKeyword;
    value: Value;
    data: Data;
}

export type ConstKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "constKeyword";
    kind: ts.SyntaxKind.ConstKeyword;
    value: Value;
    data: Data;
}

export type ConstructorKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "constructorKeyword";
    kind: ts.SyntaxKind.ConstructorKeyword;
    value: Value;
    data: Data;
}

export type ContinueKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "continueKeyword";
    kind: ts.SyntaxKind.ContinueKeyword;
    value: Value;
    data: Data;
}

export type DebuggerKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "debuggerKeyword";
    kind: ts.SyntaxKind.DebuggerKeyword;
    value: Value;
    data: Data;
}

export type DeclareKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "declareKeyword";
    kind: ts.SyntaxKind.DeclareKeyword;
    value: Value;
    data: Data;
}

export type DefaultKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "defaultKeyword";
    kind: ts.SyntaxKind.DefaultKeyword;
    value: Value;
    data: Data;
}

export type DeleteKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "deleteKeyword";
    kind: ts.SyntaxKind.DeleteKeyword;
    value: Value;
    data: Data;
}

export type DoKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "doKeyword";
    kind: ts.SyntaxKind.DoKeyword;
    value: Value;
    data: Data;
}

export type ElseKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "elseKeyword";
    kind: ts.SyntaxKind.ElseKeyword;
    value: Value;
    data: Data;
}

export type EnumKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "enumKeyword";
    kind: ts.SyntaxKind.EnumKeyword;
    value: Value;
    data: Data;
}

export type ExportKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "exportKeyword";
    kind: ts.SyntaxKind.ExportKeyword;
    value: Value;
    data: Data;
}

export type ExtendsKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "extendsKeyword";
    kind: ts.SyntaxKind.ExtendsKeyword;
    value: Value;
    data: Data;
}

export type FalseKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "falseKeyword";
    kind: ts.SyntaxKind.FalseKeyword;
    value: Value;
    data: Data;
}

export type FinallyKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "finallyKeyword";
    kind: ts.SyntaxKind.FinallyKeyword;
    value: Value;
    data: Data;
}

export type ForKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "forKeyword";
    kind: ts.SyntaxKind.ForKeyword;
    value: Value;
    data: Data;
}

export type FromKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "fromKeyword";
    kind: ts.SyntaxKind.FromKeyword;
    value: Value;
    data: Data;
}

export type FunctionKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "functionKeyword";
    kind: ts.SyntaxKind.FunctionKeyword;
    value: Value;
    data: Data;
}

export type GetKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "getKeyword";
    kind: ts.SyntaxKind.GetKeyword;
    value: Value;
    data: Data;
}

export type GlobalKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "globalKeyword";
    kind: ts.SyntaxKind.GlobalKeyword;
    value: Value;
    data: Data;
}

export type IfKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "ifKeyword";
    kind: ts.SyntaxKind.IfKeyword;
    value: Value;
    data: Data;
}

export type ImplementsKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "implementsKeyword";
    kind: ts.SyntaxKind.ImplementsKeyword;
    value: Value;
    data: Data;
}

export type ImportKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "importKeyword";
    kind: ts.SyntaxKind.ImportKeyword;
    value: Value;
    data: Data;
}

export type InferKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "inferKeyword";
    kind: ts.SyntaxKind.InferKeyword;
    value: Value;
    data: Data;
}

export type InKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "inKeyword";
    kind: ts.SyntaxKind.InKeyword;
    value: Value;
    data: Data;
}

export type InstanceOfKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "instanceofKeyword";
    kind: ts.SyntaxKind.InstanceOfKeyword;
    value: Value;
    data: Data;
}

export type InterfaceKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "interfaceKeyword";
    kind: ts.SyntaxKind.InterfaceKeyword;
    value: Value;
    data: Data;
}

export type IntrinsicKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "intrinsicKeyword";
    kind: ts.SyntaxKind.IntrinsicKeyword;
    value: Value;
    data: Data;
}

export type IsKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "isKeyword";
    kind: ts.SyntaxKind.IsKeyword;
    value: Value;
    data: Data;
}

export type KeyOfKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "keyofKeyword";
    kind: ts.SyntaxKind.KeyOfKeyword;
    value: Value;
    data: Data;
}

export type LetKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "letKeyword";
    kind: ts.SyntaxKind.LetKeyword;
    value: Value;
    data: Data;
}

export type ModuleKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "moduleKeyword";
    kind: ts.SyntaxKind.ModuleKeyword;
    value: Value;
    data: Data;
}

export type NamespaceKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "namespaceKeyword";
    kind: ts.SyntaxKind.NamespaceKeyword;
    value: Value;
    data: Data;
}

export type NeverKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "neverKeyword";
    kind: ts.SyntaxKind.NeverKeyword;
    value: Value;
    data: Data;
}

export type NewKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "newKeyword";
    kind: ts.SyntaxKind.NewKeyword;
    value: Value;
    data: Data;
}

export type NullKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "nullKeyword";
    kind: ts.SyntaxKind.NullKeyword;
    value: Value;
    data: Data;
}

export type NumberKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "numberKeyword";
    kind: ts.SyntaxKind.NumberKeyword;
    value: Value;
    data: Data;
}

export type ObjectKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "objectKeyword";
    kind: ts.SyntaxKind.ObjectKeyword;
    value: Value;
    data: Data;
}

export type OfKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "ofKeyword";
    kind: ts.SyntaxKind.OfKeyword;
    value: Value;
    data: Data;
}

export type PackageKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "packageKeyword";
    kind: ts.SyntaxKind.PackageKeyword;
    value: Value;
    data: Data;
}

export type PrivateKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "privateKeyword";
    kind: ts.SyntaxKind.PrivateKeyword;
    value: Value;
    data: Data;
}

export type ProtectedKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "protectedKeyword";
    kind: ts.SyntaxKind.ProtectedKeyword;
    value: Value;
    data: Data;
}

export type PublicKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "publicKeyword";
    kind: ts.SyntaxKind.PublicKeyword;
    value: Value;
    data: Data;
}

export type ReadonlyKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "readonlyKeyword";
    kind: ts.SyntaxKind.ReadonlyKeyword;
    value: Value;
    data: Data;
}

export type OverrideKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "overrideKeyword";
    kind: ts.SyntaxKind.OverrideKeyword;
    value: Value;
    data: Data;
}

export type RequireKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "requireKeyword";
    kind: ts.SyntaxKind.RequireKeyword;
    value: Value;
    data: Data;
}

export type ReturnKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "returnKeyword";
    kind: ts.SyntaxKind.ReturnKeyword;
    value: Value;
    data: Data;
}

export type SetKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "setKeyword";
    kind: ts.SyntaxKind.SetKeyword;
    value: Value;
    data: Data;
}

export type StaticKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "staticKeyword";
    kind: ts.SyntaxKind.StaticKeyword;
    value: Value;
    data: Data;
}

export type StringKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "stringKeyword";
    kind: ts.SyntaxKind.StringKeyword;
    value: Value;
    data: Data;
}

export type SuperKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "superKeyword";
    kind: ts.SyntaxKind.SuperKeyword;
    value: Value;
    data: Data;
}

export type SwitchKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "switchKeyword";
    kind: ts.SyntaxKind.SwitchKeyword;
    value: Value;
    data: Data;
}

export type SymbolKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "symbolKeyword";
    kind: ts.SyntaxKind.SymbolKeyword;
    value: Value;
    data: Data;
}

export type ThisKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "thisKeyword";
    kind: ts.SyntaxKind.ThisKeyword;
    value: Value;
    data: Data;
}

export type ThrowKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "throwKeyword";
    kind: ts.SyntaxKind.ThrowKeyword;
    value: Value;
    data: Data;
}

export type TrueKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "trueKeyword";
    kind: ts.SyntaxKind.TrueKeyword;
    value: Value;
    data: Data;
}

export type TryKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "tryKeyword";
    kind: ts.SyntaxKind.TryKeyword;
    value: Value;
    data: Data;
}

export type TypeKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "typeKeyword";
    kind: ts.SyntaxKind.TypeKeyword;
    value: Value;
    data: Data;
}

export type TypeOfKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "typeofKeyword";
    kind: ts.SyntaxKind.TypeOfKeyword;
    value: Value;
    data: Data;
}

export type UndefinedKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "undefinedKeyword";
    kind: ts.SyntaxKind.UndefinedKeyword;
    value: Value;
    data: Data;
}

export type UniqueKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "uniqueKeyword";
    kind: ts.SyntaxKind.UniqueKeyword;
    value: Value;
    data: Data;
}

export type UnknownKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "unknownKeyword";
    kind: ts.SyntaxKind.UnknownKeyword;
    value: Value;
    data: Data;
}

export type VarKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "varKeyword";
    kind: ts.SyntaxKind.VarKeyword;
    value: Value;
    data: Data;
}

export type VoidKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "voidKeyword";
    kind: ts.SyntaxKind.VoidKeyword;
    value: Value;
    data: Data;
}

export type WhileKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "whileKeyword";
    kind: ts.SyntaxKind.WhileKeyword;
    value: Value;
    data: Data;
}

export type WithKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "withKeyword";
    kind: ts.SyntaxKind.WithKeyword;
    value: Value;
    data: Data;
}

export type YieldKeyword<
    Value extends string,
    Data extends TokenData
> = {
    type: "yieldKeyword";
    kind: ts.SyntaxKind.YieldKeyword;
    value: Value;
    data: Data;
}

export type KeywordSyntaxKind<
    Value extends string,
    Data extends TokenData
> = 
    | AbstractKeyword<Value, Data>
    | AnyKeyword<Value, Data>
    | AsKeyword<Value, Data>
    | AssertsKeyword<Value, Data>
    | AssertKeyword<Value, Data>
    | AsyncKeyword<Value, Data>
    | AwaitKeyword<Value, Data>
    | BigIntKeyword<Value, Data>
    | BooleanKeyword<Value, Data>
    | BreakKeyword<Value, Data>
    | CaseKeyword<Value, Data>
    | CatchKeyword<Value, Data>
    | ClassKeyword<Value, Data>
    | ConstKeyword<Value, Data>
    | ConstructorKeyword<Value, Data>
    | ContinueKeyword<Value, Data>
    | DebuggerKeyword<Value, Data>
    | DeclareKeyword<Value, Data>
    | DefaultKeyword<Value, Data>
    | DeleteKeyword<Value, Data>
    | DoKeyword<Value, Data>
    | ElseKeyword<Value, Data>
    | EnumKeyword<Value, Data>
    | ExportKeyword<Value, Data>
    | ExtendsKeyword<Value, Data>
    | FalseKeyword<Value, Data>
    | FinallyKeyword<Value, Data>
    | ForKeyword<Value, Data>
    | FromKeyword<Value, Data>
    | FunctionKeyword<Value, Data>
    | GetKeyword<Value, Data>
    | GlobalKeyword<Value, Data>
    | IfKeyword<Value, Data>
    | ImplementsKeyword<Value, Data>
    | ImportKeyword<Value, Data>
    | InferKeyword<Value, Data>
    | InKeyword<Value, Data>
    | InstanceOfKeyword<Value, Data>
    | InterfaceKeyword<Value, Data>
    | IsKeyword<Value, Data>
    | KeyOfKeyword<Value, Data>
    | LetKeyword<Value, Data>
    | ModuleKeyword<Value, Data>
    | NamespaceKeyword<Value, Data>
    | NeverKeyword<Value, Data>
    | NewKeyword<Value, Data>
    | NullKeyword<Value, Data>
    | NumberKeyword<Value, Data>
    | ObjectKeyword<Value, Data>
    | OfKeyword<Value, Data>
    | PackageKeyword<Value, Data>
    | PrivateKeyword<Value, Data>
    | ProtectedKeyword<Value, Data>
    | PublicKeyword<Value, Data>
    | ReadonlyKeyword<Value, Data>
    | OverrideKeyword<Value, Data>
    | RequireKeyword<Value, Data>
    | ReturnKeyword<Value, Data>
    | SetKeyword<Value, Data>
    | StaticKeyword<Value, Data>
    | StringKeyword<Value, Data>
    | SuperKeyword<Value, Data>
    | SwitchKeyword<Value, Data>
    | SymbolKeyword<Value, Data>
    | ThisKeyword<Value, Data>
    | ThrowKeyword<Value, Data>
    | TrueKeyword<Value, Data>
    | TryKeyword<Value, Data>
    | TypeKeyword<Value, Data>
    | TypeOfKeyword<Value, Data>
    | UndefinedKeyword<Value, Data>
    | UniqueKeyword<Value, Data>
    | UnknownKeyword<Value, Data>
    | VarKeyword<Value, Data>
    | VoidKeyword<Value, Data>
    | WhileKeyword<Value, Data>
    | WithKeyword<Value, Data>
    | YieldKeyword<Value, Data>;

export type KeywordMap<
    Value extends string,
    Data extends TokenData
> = {
    "abstract": AbstractKeyword<Value, Data>;
    "any": AnyKeyword<Value, Data>;
    "as": AsKeyword<Value, Data>;
    "asserts": AssertsKeyword<Value, Data>;
    "assert": AssertKeyword<Value, Data>;
    "async": AsyncKeyword<Value, Data>;
    "await": AwaitKeyword<Value, Data>;
    "bigint": BigIntKeyword<Value, Data>;
    "boolean": BooleanKeyword<Value, Data>;
    "break": BreakKeyword<Value, Data>;
    "case": CaseKeyword<Value, Data>;
    "catch": CatchKeyword<Value, Data>;
    "class": ClassKeyword<Value, Data>;
    "const": ConstKeyword<Value, Data>;
    "constructor": ConstructorKeyword<Value, Data>;
    "continue": ContinueKeyword<Value, Data>;
    "debugger": DebuggerKeyword<Value, Data>;
    "declare": DeclareKeyword<Value, Data>;
    "default": DefaultKeyword<Value, Data>;
    "delete": DeleteKeyword<Value, Data>;
    "do": DoKeyword<Value, Data>;
    "else": ElseKeyword<Value, Data>;
    "enum": EnumKeyword<Value, Data>;
    "export": ExportKeyword<Value, Data>;
    "extends": ExtendsKeyword<Value, Data>;
    "false": FalseKeyword<Value, Data>;
    "finally": FinallyKeyword<Value, Data>;
    "for": ForKeyword<Value, Data>;
    "from": FromKeyword<Value, Data>;
    "function": FunctionKeyword<Value, Data>;
    "get": GetKeyword<Value, Data>;
    "global": GlobalKeyword<Value, Data>;
    "if": IfKeyword<Value, Data>;
    "implements": ImplementsKeyword<Value, Data>;
    "import": ImportKeyword<Value, Data>;
    "infer": InferKeyword<Value, Data>;
    "in": InKeyword<Value, Data>;
    "instanceof": InstanceOfKeyword<Value, Data>;
    "interface": InterfaceKeyword<Value, Data>;
    "is": IsKeyword<Value, Data>;
    "keyof": KeyOfKeyword<Value, Data>;
    "let": LetKeyword<Value, Data>;
    "module": ModuleKeyword<Value, Data>;
    "namespace": NamespaceKeyword<Value, Data>;
    "never": NeverKeyword<Value, Data>;
    "new": NewKeyword<Value, Data>;
    "null": NullKeyword<Value, Data>;
    "number": NumberKeyword<Value, Data>;
    "object": ObjectKeyword<Value, Data>;
    "of": OfKeyword<Value, Data>;
    "package": PackageKeyword<Value, Data>;
    "private": PrivateKeyword<Value, Data>;
    "protected": ProtectedKeyword<Value, Data>;
    "public": PublicKeyword<Value, Data>;
    "readonly": ReadonlyKeyword<Value, Data>;
    "override": OverrideKeyword<Value, Data>;
    "require": RequireKeyword<Value, Data>;
    "return": ReturnKeyword<Value, Data>;
    "set": SetKeyword<Value, Data>;
    "static": StaticKeyword<Value, Data>;
    "string": StringKeyword<Value, Data>;
    "super": SuperKeyword<Value, Data>;
    "switch": SwitchKeyword<Value, Data>;
    "symbol": SymbolKeyword<Value, Data>;
    "this": ThisKeyword<Value, Data>;
    "throw": ThrowKeyword<Value, Data>;
    "true": TrueKeyword<Value, Data>;
    "try": TryKeyword<Value, Data>;
    "type": TypeKeyword<Value, Data>;
    "typeof": TypeOfKeyword<Value, Data>;
    "undefined": UndefinedKeyword<Value, Data>;
    "unique": UniqueKeyword<Value, Data>;
    "unknown": UnknownKeyword<Value, Data>;
    "var": VarKeyword<Value, Data>;
    "void": VoidKeyword<Value, Data>;
    "while": WhileKeyword<Value, Data>;
    "with": WithKeyword<Value, Data>;
    "yield": YieldKeyword<Value, Data>;
};

export type Identifier<
    Value extends string,
    Data extends TokenData
> = {
    type: "identifier";
    kind: ts.SyntaxKind.Identifier;
    value: Value;
    data: Data;
}

export type TokenSyntaxKind<
    Data extends TokenData = TokenData,
    Value extends string = "",
> = | Unknown<Value, Data>
    | EndOfFileToken<Value, Data>
    | TriviaSyntaxKind<Value, Data>
    | LiteralSyntaxKind<Value, Data>
    | PseudoLiteralSyntaxKind<Value, Data>
    | PunctuationSyntaxKind<Value, Data>
    | Identifier<Value, Data>
    | KeywordSyntaxKind<Value, Data>;

export type TokenMap<
    Value extends string,
    Data extends TokenData
> = {
    "UNKNOWN": Unknown<Value, Data>;
    "": EndOfFileToken<Value, Data>;
} & PunctuationTokenMap<Value, Data>
  & KeywordMap<Value, Data>