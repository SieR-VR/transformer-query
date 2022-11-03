import { makeTransform, q, Identifier } from "..";
import { SomeBaseClass } from "./class.spec";

export default makeTransform([
    (tree) => {
        tree.query(q`class ${Identifier} extends ${SomeBaseClass} { a = 1 }`)
            .query(q`a = 1`)
            .replace(node => {
                console.log(node.kind);
                return node;
            })
    }
]);
