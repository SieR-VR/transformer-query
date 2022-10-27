import ts from "typescript";
import { makeTransform, q, hashNode, simpleHash } from ".";

import * as fs from "fs";
const packageJson: { name: string } = JSON.parse(fs.readFileSync("package.json", "utf8"));
const isDev = packageJson.name === "transformer-query";
const reservedWildcard = isDev ? [
    simpleHash("src/index.ts:Identifier"), 
    simpleHash("src/index.ts:StringLiteral"),
    simpleHash("src/index.ts:NumericLiteral"),
] : [
    simpleHash("node_modules/transformer-query/lib/index.js:Identifier"),
    simpleHash("node_modules/transformer-query/lib/index.js:StringLiteral"),
    simpleHash("node_modules/transformer-query/lib/index.js:NumericLiteral"),
]

export default makeTransform([
    (tree, checker) => {
        tree.query(q`q\`\``)
            .replace((node, type) => {
                if (!ts.isTaggedTemplateExpression(node)) {
                    console.log("not a tagged template expression, actual kind:", ts.SyntaxKind[node.kind]);
                    return node;
                }

                const { tag, template } = node as ts.TaggedTemplateExpression;
                if (!ts.isTemplateExpression(template)) {
                    return node;
                }
                
                const { head, templateSpans } = template;
                return ts.factory.createTaggedTemplateExpression(
                    tag,
                    undefined,
                    ts.factory.createTemplateExpression(
                        ts.factory.createTemplateHead(head.text),
                        templateSpans.map((span) => {
                            const { expression, literal } = span;
                            const hashedExpression = hashNode(checker, expression);

                            if (reservedWildcard.includes(hashedExpression)) {
                                return span
                            }

                            return ts.factory.createTemplateSpan(
                                ts.factory.createStringLiteral(`_$${hashedExpression}$_`),
                                ts.factory.createTemplateTail(literal.text),
                            );
                        }),
                    )
                )
            });
    },
]);