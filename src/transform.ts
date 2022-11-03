import ts from "typescript";
import { makeTransform, q, simpleHash, Tree, TemplateLiteral } from ".";

import * as fs from "fs";
const packageJson: { name: string } = JSON.parse(fs.readFileSync("package.json", "utf8"));
const isDev = packageJson.name === "transformer-query";
const reservedWildcard = isDev ? [
    simpleHash("src/index.ts:Identifier"),
    simpleHash("src/index.ts:StringLiteral"),
    simpleHash("src/index.ts:NumericLiteral"),
    simpleHash("src/index.ts:TemplateLiteral"),
] : [
    simpleHash("node_modules/transformer-query/lib/index.js:Identifier"),
    simpleHash("node_modules/transformer-query/lib/index.js:StringLiteral"),
    simpleHash("node_modules/transformer-query/lib/index.js:NumericLiteral"),
    simpleHash("node_modules/transformer-query/lib/index.js:TemplateLiteral"),
]

export default makeTransform([
    (source, checker) => {
        source
            .query(q`q${TemplateLiteral}`)
            .replace(node => {
                if (!ts.isTaggedTemplateExpression(node))
                    return node;

                const { tag, template } = node;

                if (!ts.isTemplateExpression(template))
                    return node;

                const { head, templateSpans } = template;

                const processedSpans = templateSpans.map(span => {
                    const { expression, literal } = span;

                    const tree = new Tree(expression, expression.getSourceFile());
                    const hash = tree.getHash(checker);

                    if (reservedWildcard.includes(hash))
                        return span;
                    
                    return ts.factory.createTemplateSpan(
                        ts.factory.createStringLiteral(hash),
                        literal
                    )
                });

                return ts.factory.createTaggedTemplateExpression(
                    tag,
                    undefined,
                    ts.factory.createTemplateExpression(
                        head,
                        processedSpans
                    ),
                );
            });
    },
]);