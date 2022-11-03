import * as hs from "./Node";
import * as SyntaxKind from "../Tokenizer/SyntaxKind";

import { ParseArrayResult } from "./Utils";
import { ParsingError } from "../Utils";

import { ParseSourceFile } from "./SourceFile";

export type Parse<TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[]> = 
    ParseSourceFile<TokenList> extends ParseArrayResult<infer NodeList, infer TokenList, infer Error>
        ? Error extends ParsingError<any>
            ? Error
            : NodeList
        : ParseSourceFile<TokenList>;
    