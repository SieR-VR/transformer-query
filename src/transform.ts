import ts from "typescript";
import { makeTransform, q } from ".";

export default makeTransform([
    (tree) => {
        tree.query(q`class SomeClass { bar: string = "bar"; }`)
            .replaceWithText(`class SomeClass { bar: string = "bar"; baz: string = "baz"; }`);
    },
]);