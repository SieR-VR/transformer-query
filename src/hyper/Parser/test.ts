import * as Parser from ".";
import { Tokenizer } from "../Tokenizer";

type TestIdentifierToken = Tokenizer<"id">;
type TestNumberToken = Tokenizer<"number">;

type TestParseTypeNode = Parser.ParseTypeNode<TestIdentifierToken>;