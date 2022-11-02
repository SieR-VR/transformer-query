import * as Parser from ".";
import { InternalTokenizer } from "../Tokenizer";

type TestIdentifierToken = InternalTokenizer<"id">;
type TestNumberToken = InternalTokenizer<"number">;

type TestParseTypeNode = Parser.ParseTypeNode<TestIdentifierToken>;