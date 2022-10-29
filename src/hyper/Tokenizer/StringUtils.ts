export type ExcludeFirstChar<S extends string> = S extends `${infer _}${infer R}` ? R : never;
export type GetFirstChar<S extends string> = GetFirst1Char<S>;

export type ConcatStrings<S1 extends string, S2 extends string> = `${S1}${S2}`;

export type StringContains<S extends string, Sub extends string> = 
    S extends Sub
    ? true
    : S extends `${infer _}${Sub}`
    ? true
    : S extends `${Sub}${infer _}`
    ? true
    : S extends `${infer _0}${Sub}${infer _1}`
    ? true
    : false;

export type FilterLength1<S extends string> =
    S extends `${infer _0}${infer _1}`
        ? _1 extends `${infer _1_0}${infer _1_1}`
            ? never
            : S
        : never;

export type GetFirst1Char<S extends string> =
S extends `${infer _0}${infer _1}`
    ? _0
    : S extends `${infer _0}`
        ? _0
        : never;

export type FilterLength2<S extends string> =
S extends `${infer _0}${infer _1}${infer _2}`
    ? _2 extends `${infer _2_0}${infer _2_1}`
        ? never
        : S
    : never;

export type GetFirst2Chars<S extends string> =
S extends `${infer _0}${infer _1}${infer _2}`
    ? `${_0}${_1}`
    : S extends `${infer _0}${infer _1}`
        ? `${_0}${_1}`
        : never;

export type FilterLength3<S extends string> =
S extends `${infer _0}${infer _1}${infer _2}${infer _3}`
    ? _3 extends `${infer _3_0}${infer _3_1}`
        ? never
        : S
    : never;

export type GetFirst3Chars<S extends string> =
S extends `${infer _0}${infer _1}${infer _2}${infer _3}`
    ? `${_0}${_1}${_2}`
    : S extends `${infer _0}${infer _1}${infer _2}`
        ? `${_0}${_1}${_2}`
        : never;

export type FilterLength4<S extends string> =
S extends `${infer _0}${infer _1}${infer _2}${infer _3}${infer _4}`
    ? _4 extends `${infer _4_0}${infer _4_1}`
        ? never
        : S
    : never;

export type GetFirst4Chars<S extends string> =
S extends `${infer _0}${infer _1}${infer _2}${infer _3}${infer _4}`
    ? `${_0}${_1}${_2}${_3}`
    : S extends `${infer _0}${infer _1}${infer _2}${infer _3}`
    ? `${_0}${_1}${_2}${_3}`
    : never;