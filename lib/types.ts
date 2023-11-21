export type Diff<T, U> = T extends U ? never : T;

export type NonNullable<T> = Diff<T, null | undefined>;

export type NumberKeys<T extends object> = {
  [K in keyof T]: NonNullable<T[K]> extends number ? K : never;
}[keyof T];
