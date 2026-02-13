/**
 * Represents a value that may be null or undefined.
 */
export type Nullable<T> = T | null | undefined;

/**
 * An array that is guaranteed to have at least one element.
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Makes all properties of T optional recursively.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Makes all properties of T readonly recursively.
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Makes all properties of T required recursively.
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * A stricter version of Omit that only allows keys that exist on T.
 */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * A stricter version of Extract that requires U to extend T.
 */
export type StrictExtract<T, U extends T> = Extract<T, U>;

/**
 * Flattens intersection types for better IDE readability.
 * @example Prettify<{ a: 1 } & { b: 2 }> // { a: 1; b: 2 }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- The `& {}` is intentional: it forces TypeScript to eagerly evaluate intersections, flattening them for better IDE display.
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}; // NOSONAR

/**
 * Creates a branded/nominal type for type-safe identifiers.
 * @example type UserId = Brand<string, 'UserId'>;
 * @example type OrderId = Brand<string, 'OrderId'>;
 */
export type Brand<T, B extends string> = T & { readonly __brand: B };

/**
 * A value that may be a Promise or a direct value.
 * Useful for functions that can be sync or async.
 */
export type MaybePromise<T> = T | Promise<T>;

/**
 * A value that may be a PromiseLike (thenable) or a direct value.
 */
export type Awaitable<T> = T | PromiseLike<T>;

/**
 * Extracts the resolved type from a Promise.
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

/**
 * Makes specific keys of T optional.
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Makes specific keys of T required.
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * A record where all values are of type V, with string keys.
 */
export type Dictionary<V = unknown> = Record<string, V>;
