import * as hs from "./Node";
import * as SyntaxKind from "../Tokenizer/SyntaxKind";

import { TokenData } from "../Tokenizer";
import { ParseResult, ParseArrayResult, ScopeType } from "./Utils";

export type ParseSyntaxList<
    TokenList extends SyntaxKind.TokenSyntaxKind<any, any>[],
    Result extends hs.Node[] = [],
    Scope extends ScopeType = {},
    NeedComma extends boolean = false,
> = TokenList extends []
    ? ParseArrayResult<Result, TokenList>
    : "";

export default () => {};