export type Push<T extends Array<any>, E> = [...T, E];

export type Tail<T extends Array<any>> = ((...t: T) => any) extends (
    h: any,
    ...rest: infer R
) => void
    ? R
    : never;

export type TailBy<
    T extends Array<any>,
    B extends number,
    A extends Array<any> = [],
> = B extends A['length'] ? T : TailBy<Tail<T>, B, Push<A, 0>>;

export type ParsingError<Message extends string> = {
    type: 'ParsingError';
    message: Message;
};
