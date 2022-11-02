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
    GetLength,
} from "./StringUtils";
import { Numbers, Symbols } from "./Input";
import { Add, Succ } from "./Math";
import { Push } from "../Utils";

export type TokenData<
    PrecedingLineBreak extends boolean = boolean,
    Line extends number = number,
    ColumnStart extends number = number,
    ColumnEnd extends number = number,
    Start extends number = number,
    End extends number = number,
> = {
    precedingLineBreak: PrecedingLineBreak;
    line: Line;
    columnStart: ColumnStart;
    columnEnd: ColumnEnd;
    start: Start;
    end: End;
}

type Tail<
    InputTail extends string,
    Line extends number,
    ColumnEnd extends number,
    End extends number,
> = {
    inputTail: InputTail;
    line: Line;
    column: ColumnEnd;
    end: End;
}

type PunctuationTokens = SyntaxKind.PunctuationSyntaxKind<string, TokenData>["token"];

type TokenizeInput<
    Input extends string,
    FirstChar extends string,
    InputTail extends string,
    PrecedingLineBreak extends boolean,
    LineNumber extends number,
    ColumnStart extends number,
    Start extends number,
> = Input extends `${FilterLength4<PunctuationTokens>}${infer InputTail}`
    ? [
        TokenizePunctuation<
            GetFirst4Chars<Input>, 
            TokenData<
                PrecedingLineBreak, 
                LineNumber, 
                ColumnStart,
                Add<4, ColumnStart>,
                Start,
                Add<4, Start>
            >
        >, 
        Tail<
            InputTail, 
            LineNumber, 
            Add<4, ColumnStart>, 
            Add<4, Start>
        >
    ]
    : Input extends `${FilterLength3<PunctuationTokens>}${infer InputTail}`
    ? [
        TokenizePunctuation<
            GetFirst3Chars<Input>,
            TokenData<
                PrecedingLineBreak,
                LineNumber,
                ColumnStart,
                Add<3, ColumnStart>,
                Start,
                Add<3, Start>
            >
        >,
        Tail<
            InputTail,
            LineNumber,
            Add<3, ColumnStart>,
            Add<3, Start>
        >
    ]
    : Input extends `${FilterLength2<PunctuationTokens>}${infer InputTail}`
    ? [
        TokenizePunctuation<
            GetFirst2Chars<Input>,
            TokenData<
                PrecedingLineBreak,
                LineNumber,
                ColumnStart,
                Add<2, ColumnStart>,
                Start,
                Add<2, Start>
            >
        >,
        Tail<
            InputTail,
            LineNumber,
            Add<2, ColumnStart>,
            Add<2, Start>
        >
    ]
    : FirstChar extends FilterLength1<PunctuationTokens>
    ? [
        TokenizePunctuation<
            GetFirstChar<Input>,
            TokenData<
                PrecedingLineBreak,
                LineNumber,
                ColumnStart,
                Add<1, ColumnStart>,
                Start,
                Add<1, Start>
            >
        >,
        Tail<
            InputTail,
            LineNumber,
            Add<1, ColumnStart>,
            Add<1, Start>
        >
    ]
    : FirstChar extends Numbers
    ? TokenizeNumber<
        Input, 
        '', 
        PrecedingLineBreak, 
        LineNumber, 
        ColumnStart,
        ColumnStart,
        Start,
        Start
    >
    : FirstChar extends '"'
    ? TokenizeString<
        InputTail, 
        '"', 
        "", 
        PrecedingLineBreak, 
        LineNumber, 
        ColumnStart,
        ColumnStart,
        Start,
        Start
    >
    : FirstChar extends "'"
    ? TokenizeString<
        InputTail, 
        "'", 
        "", 
        PrecedingLineBreak, 
        LineNumber,
        ColumnStart,
        ColumnStart,
        Start,
        Start
    >
    : FirstChar extends Symbols
    ? TokenizeSymbol<
        Input, 
        '', 
        PrecedingLineBreak, 
        LineNumber, 
        ColumnStart,
        ColumnStart,
        Start,
        Start
    >
    : never;

type TokenizePunctuation<P extends string, Data extends TokenData> =
    P extends keyof SyntaxKind.PunctuationTokenMap<P, Data>
    ? SyntaxKind.PunctuationTokenMap<P, Data>[P]
    : never;

type TokenizeNumber<
    Input extends string,
    Result extends string,
    PrecedingLineBreak extends boolean,
    LineNumber extends number,
    ColumnStart extends number,
    ColumnEnd extends number,
    Start extends number,
    End extends number,
    FirstChar extends string = GetFirstChar<Input>,
> = FirstChar extends Numbers
    ? TokenizeNumber<
        ExcludeFirstChar<Input>,
        ConcatStrings<Result, FirstChar>,
        PrecedingLineBreak,
        LineNumber,
        ColumnStart,
        Succ<ColumnEnd>,
        Start,
        Succ<End>
    >
    : [
        SyntaxKind.NumericLiteral<
            Result, 
            TokenData<
                PrecedingLineBreak, 
                LineNumber, 
                ColumnStart,
                ColumnEnd,
                Start,
                End
            >
        >, 
        Tail<Input, LineNumber, ColumnEnd, End>
    ];

type TokenizeString<
    Input extends string,
    QuoteType extends '"' | "'",
    Value extends string,
    PrecedingLineBreak extends boolean,
    LineNumber extends number,
    ColumnStart extends number,
    ColumnEnd extends number,
    Start extends number,
    End extends number,
> = Input extends `${QuoteType}${infer InputTail}`
    ? [
        SyntaxKind.StringLiteral<
            Value, 
            TokenData<
                PrecedingLineBreak, 
                LineNumber, 
                ColumnStart,
                ColumnEnd,
                Start,
                End
            >
        >, 
        Tail<InputTail, LineNumber, ColumnEnd, End>
    ]
    : Input extends `${infer Char}${infer InputTail}`
    ? TokenizeString<
        InputTail,
        QuoteType,
        `${Value}${Char}`,
        PrecedingLineBreak,
        LineNumber,
        ColumnStart,
        Succ<ColumnEnd>,
        Start,
        Succ<End>
    >
    : never;

type TokenizeSymbol<
    Input extends string,
    Result extends string,
    PrecedingLineBreak extends boolean,
    LineNumber extends number,
    ColumnStart extends number,
    ColumnEnd extends number,
    Start extends number,
    End extends number,
    FirstChar extends string = GetFirstChar<Input>,
> = FirstChar extends Symbols
    ? TokenizeSymbol<
        ExcludeFirstChar<Input>,
        ConcatStrings<Result, FirstChar>,
        PrecedingLineBreak,
        LineNumber,
        ColumnStart,
        Succ<ColumnEnd>,
        Start,
        Succ<End>
    >
    : [
        Result extends keyof SyntaxKind.KeywordMap<Result, TokenData>
        ? SyntaxKind.KeywordMap<
            Result, 
            TokenData<
                PrecedingLineBreak, 
                LineNumber, 
                ColumnStart,
                ColumnEnd,
                Start,
                End
            >
        >[Result]
        : SyntaxKind.Identifier<
            Result, 
            TokenData<
                PrecedingLineBreak, 
                LineNumber,
                ColumnStart,
                ColumnEnd,
                Start,
                End
            >
        >,
        Tail<Input, LineNumber, ColumnEnd, End>
    ];


type TokenizeHelper<
    TokenizeResult,
    Result extends Array<any>,
> = TokenizeResult extends Array<any>
    ? TokenizeResult[1] extends Tail<
        infer InputTail,
        infer LineNumber,
        infer ColumnStart,
        infer Start
    > 
        ? InternalTokenizer<
            InputTail,
            Push<Result, TokenizeResult[0]>,
            LineNumber,
            ColumnStart,
            ColumnStart,
            Start,
            Start
        >
        : never
    : TokenizeResult;

export type InternalTokenizer<
    Input extends string,
    Result extends Array<SyntaxKind.TokenSyntaxKind<any, any>> = [],
    LineNumber extends number = 1,
    ColumnStart extends number = 1,
    ColumnEnd extends number = 1,
    Start extends number = 0,
    End extends number = 0,
    PrecedingLineBreak extends boolean = false,
    FirstChar extends string = GetFirstChar<Input>,
    InputTail extends string = ExcludeFirstChar<Input>,
> = Input extends ''
    ? Push<Result, SyntaxKind.EndOfFileToken<"", TokenData<PrecedingLineBreak, LineNumber, ColumnStart, ColumnEnd, Start, End>>>
    : FirstChar extends (' ' | '\t')
    ? InternalTokenizer<
        InputTail, 
        Result, 
        LineNumber, 
        Succ<ColumnStart>,
        Succ<ColumnEnd>,
        Succ<Start>,
        Succ<End>,
        PrecedingLineBreak
    >
    : FirstChar extends '\n'
    ? InternalTokenizer<
        InputTail, 
        Result, 
        Succ<LineNumber>, 
        1, 
        1,
        Succ<Start>,
        Succ<End>,
        true
    >
    : TokenizeInput<
        Input,
        FirstChar,
        InputTail,
        PrecedingLineBreak,
        LineNumber,
        ColumnStart,
        Start
    > extends infer TokenizeResult
    ? TokenizeHelper<TokenizeResult, Result>
    : never;

export type Tokenizer<Input extends string> = InternalTokenizer<Input>;
