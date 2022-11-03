import * as hs from "./Node";
import * as SyntaxKind from "../Tokenizer/SyntaxKind";

import { TokenData } from "../Tokenizer";
import { ParseResult, ParseArrayResult } from "./Utils";
import { ParsingError, Tail, Push } from "../Utils";

export type ParseSourceFile<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[], 
    Result extends hs.Node[] = [],
> = TokenList extends []
    ? ParseArrayResult<Result, TokenList>
    : ParseSourceFileWorker

type ParseSourceFileWorker<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[],
    Result extends hs.Node[] = []
> = TokenList[0] extends SyntaxKind.EndOfFileToken<any, any>
    ? ParseArrayResult<Result, TokenList, ParsingError<"Unexpected end of file.">>
    : 