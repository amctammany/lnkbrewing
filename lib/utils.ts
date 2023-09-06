export function parseFloats1<S extends Record<string, string>>(
  src: S,
  ...keys: (keyof S)[]
) {
  return keys.reduce((acc, k) => {
    acc[k] = parseFloat(src[k]);
    return acc;
  }, {} as Record<keyof S, number>);
//}
//export function parseStrings(src: FormData, ...keys: string[]) {
  //return keys.reduce((acc, k) => {
    //acc[k] = src.get(k)?.toString();
    //return acc;
  //}, {} as Record<string, string | undefined>);
//}
//export function parseFloats(src: FormData, ...keys: string[]) {
  //return keys.reduce((acc, k) => {
    //acc[k] = parseFloat(src.get(k)?.toString() || "");
    //return acc;
  //}, {} as Record<string, number | undefined>);
//}

export type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];
