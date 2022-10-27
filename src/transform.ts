import ts from "typescript";
import { makeTransform, q } from ".";

export default makeTransform([
    (tree) => {
        tree.query(q`class SomeClass { bar: string = "bar"; }`)
            .replace((node, typeNode) => {
                return ts.factory.createClassDeclaration(
                    undefined,
                    "Transformed",
                    undefined,
                    undefined,
                    [],
                );
            });
    },
]);