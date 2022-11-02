export type Expect<T extends true> = T;
export type ExpectTrue<T extends true> = T;
export type ExpectFalse<T extends false> = T;
export type ExpectNever<T> = [T] extends [never] ? true : false;

export type Equal<A, B> = 
    (<T>() => T extends A ? 1 : 2) extends
    (<T>() => T extends B ? 1 : 2) ? true : false;
export type NotEqual<A, B> = true extends Equal<A, B> ? false : true;

