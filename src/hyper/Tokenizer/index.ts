import * as SyntaxKind from "./SyntaxKind";
import { 
    ConcatStrings, 
    ExcludeFirstChar, 
    GetFirstChar, 
    StringContains,
    FilterLength1,
    FilterLength2,
    FilterLength3,
    FilterLength4,
    GetFirst2Chars,
    GetFirst3Chars,
    GetFirst4Chars,
} from "./StringUtils";
import { Numbers, Symbols } from "./Input";
import { Succ } from "./Math";
import { Push } from "../Utils";

export type TokenData<
    PrecedingLineBreak extends boolean = boolean,
    Line extends number = number,
> = {
    precedingLineBreak: PrecedingLineBreak;
    line: Line;
}

type PunctuationTokens = SyntaxKind.PunctuationSyntaxKind<string, TokenData>["token"];

type TokenizeInput<
    Input extends string,
    FirstChar extends string,
    InputTail extends string,
    PrecedingLineBreak extends boolean,
    LineNumber extends number,
    Data extends TokenData<any, any> = TokenData<PrecedingLineBreak, LineNumber>,
> = Input extends `${FilterLength4<PunctuationTokens>}${infer InputTail}`
    ? [TokenizePunctuation<GetFirst4Chars<Input>, Data>, InputTail]
    : Input extends `${FilterLength3<PunctuationTokens>}${infer InputTail}`
    ? [TokenizePunctuation<GetFirst3Chars<Input>, Data>, InputTail]
    : Input extends `${FilterLength2<PunctuationTokens>}${infer InputTail}`
    ? [TokenizePunctuation<GetFirst2Chars<Input>, Data>, InputTail]
    : FirstChar extends FilterLength1<PunctuationTokens>
    ? [TokenizePunctuation<FirstChar, Data>, InputTail]
    : FirstChar extends Numbers
    ? TokenizeNumber<Input, '', Data, FirstChar>
    : FirstChar extends '"'
    ? TokenizeString<InputTail, '"', Data>
    : FirstChar extends "'"
    ? TokenizeString<InputTail, "'", Data>
    : FirstChar extends Symbols
    ? TokenizeSymbol<Input, '', Data, FirstChar>
    : never;

type TokenizePunctuation<P extends string, Data extends TokenData> =
    P extends keyof SyntaxKind.PunctuationTokenMap<P, Data>
        ? SyntaxKind.PunctuationTokenMap<P, Data>[P]
        : never;

type TokenizeNumber<
    Input extends string,
    Result extends string,
    Data extends TokenData,
    FirstChar extends string = GetFirstChar<Input>,
> = FirstChar extends Numbers
    ? TokenizeNumber<
        ExcludeFirstChar<Input>,
        ConcatStrings<Result, FirstChar>,
        Data
    >
    : [SyntaxKind.NumericLiteral<Result, Data>, Input];

type TokenizeString<
    Input extends string,
    QuoteType extends '"' | "'",
    Data extends TokenData,
> = Input extends `${infer Before}${QuoteType}${infer After}`
    ? StringContains<Before, '\n'> extends true
        ? never
        : [SyntaxKind.StringLiteral<Before, Data>, After]
    : never;

type TokenizeSymbol<
    Input extends string,
    Result extends string,
    Data extends TokenData,
    FirstChar extends string = GetFirstChar<Input>,
> = FirstChar extends Symbols
    ? TokenizeSymbol<
        ExcludeFirstChar<Input>,
        ConcatStrings<Result, FirstChar>,
        Data
    >
    : [
        Result extends keyof SyntaxKind.KeywordMap<Result, Data>
            ? SyntaxKind.KeywordMap<Result, Data>[Result]
            : SyntaxKind.Identifier<Result, Data>,
        Input
    ];


type TokenizeHelper<
    TokenizeResult,
    Result extends Array<any>,
    LineNumber extends number,
> = TokenizeResult extends Array<any>
    ? Tokenizer<
        TokenizeResult[1],
        Push<Result, TokenizeResult[0]>,
        LineNumber,
        false
    >
    : TokenizeResult;

export type Tokenizer<
    Input extends string,
    Result extends Array<SyntaxKind.TokenSyntaxKind<any, any>> = [],
    LineNumber extends number = 1,
    PrecedingLineBreak extends boolean = false,
    FirstChar extends string = GetFirstChar<Input>,
    InputTail extends string = ExcludeFirstChar<Input>,
> = Input extends ''
    ? Result
    : FirstChar extends (' ' | '\t')
    ? Tokenizer<InputTail, Result, LineNumber, PrecedingLineBreak>
    : FirstChar extends '\n'
    ? Tokenizer<InputTail, Result, Succ<LineNumber>, true>
    : TokenizeInput<
        Input, 
        FirstChar, 
        InputTail, 
        PrecedingLineBreak, 
        LineNumber
    > extends infer TokenizeResult
    ? TokenizeHelper<TokenizeResult, Result, LineNumber>
    : never;

type Test = Tokenizer<"class a extends b">;