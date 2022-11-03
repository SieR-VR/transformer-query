import { makeTransform, q, Identifier } from "..";
import { SomeBaseClass } from "./class.spec";

export default makeTransform([
    (tree) => {
        tree.query(q`class ${Identifier} extends ${SomeBaseClass} { a = 1 }`)
            .replaceText((node, type) => {
                return `class TransformedClass { a = 1000 }`;
            })
    }
]);
