import ts from "typescript";

import type { Tokenize, Token } from "@ronami/hypescript/src/Tokenizer";
import type { Parse, BaseNode } from "@ronami/hypescript/src/Parser";
import type { Format, Error } from "@ronami/hypescript/src/Utils";

export type Parser<Input extends string> =
    Tokenize<Input> extends infer TokenList
        ? TokenList extends Error<any, any>
            ? Format<[TokenList]>
            : TokenList extends Array<Token<any>>
                ? Parse<TokenList> extends infer NodeList
                    ? NodeList extends Error<any, any>
                        ? Format<[NodeList]>
                        : NodeList extends Array<BaseNode<any>>
                            ? NodeList
                            : never
                    : never
                : never
            : never;