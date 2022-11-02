import { NotEqual, Equal, Expect, ExpectFalse, ExpectNever } from "./TestUtils";

import { Tokenizer } from "../Tokenizer";
import * as Parser from "../Parser";
import * as hs from "../Parser/Node";

type TestIdentifier = Tokenizer<"test">;
type TestVarDeclaration = Tokenizer<"var a: number = a">;
type TestDeclarationList = Tokenizer<"a = a, b: number = b">;

type Test = Parser.ParseVariableStatement<TestVarDeclaration>["node"];
type Test2 = Parser.ParseVariableDeclarationList<TestDeclarationList>["node"];

type Cases = [
    Expect<Equal<Parser.ParseTypeNode<TestIdentifier>["node"], hs.TypeNode<"test">>>,
    Expect<Equal<
        Parser.ParseVariableStatement<TestVarDeclaration>["node"],
        hs.VariableStatement<hs.VariableDeclarationList<[
            hs.VariableDeclaration<hs.BindingName<"a">, hs.KeywordTypeNode<"number">, hs.Expression<[hs.Identifier<"a">], "a">>,
        ], string>, string>
    >>,
]