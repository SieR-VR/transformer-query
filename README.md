# transformer-query

This is the proof-of-concept library of querying ast nodes with valid string. 

Thanks for ttypescript, this made it easy to develop this library.

# How to use

Install [ttypescript](https://github.com/cevek/ttypescript)

```
npm install ttypescript -D
```

And use ```ttsc``` instead of ```tsc```.

## (Optional) Register Transformer-Query Transform

**To use imported wildcard query, you should register transform.**

Just add this

```json
{
    ...
    "compilerOptions": {
        "plugins": { "transform": "transformer-query/lib/transform" }
    }
}
```

to your ```tsconfig.json```

That's it!

## Make Transform

```typescript
import { makeTransform } from "transformer-query";

export default makeTransform([
    (source, checker) => {
        ...
    }
]);

```

## Query

```typescript

import { q } from "transformer-query";

...

(source, checker) => {
    source.query(q`class ToTransform {}`)
}

...

```

### Query Wildcard

```typescript

import { q, Identifier } from "transformer-query";
import { MyClass } from "./MyClass";

...

(source, checker) => {
    source.query(q`class ${Identifier} extends ${MyClass} {}`)
}

...

```

**Note: To use Imported Wildcard, you should follow instruction on [above](#optional-register-transformer-query-transform)**

## Replacing

Transformer-Query provides five kinds of replace method.

Function Signatures

```typescript

replace(replacer: (node: ts.Node) => ts.Node): Source<T>;

replaceWith(toReplace: ts.Node): Source<T>;

replaceText(replacer: (node: ts.Node) => string): Source<T>;

replaceWithText(toReplace: string): Source<T>;

remove(): void;

```

To replace, just call replace method with call-chain.

Ex)

```typescript

...

(source, checker) => {
    source
        .query(q`class ${Identifier} {}`)
        .replaceWithText("class Transformed {}");
}

...

```