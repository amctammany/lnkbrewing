export function parseFloats1<S extends Record<string, string>>(
  src: S,
  ...keys: (keyof S)[]
) {
  return keys.reduce((acc, k) => {
    acc[k] = parseFloat(src[k]);
    return acc;
  }, {} as Record<keyof S, number>);
}
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
export function getObjectDifferences(obj1: any, obj2: any): any {
  if (obj1 === null || obj2 === null) {
    return obj1 !== obj2 ? [obj1, obj2] : undefined;
  }
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return obj1 !== obj2 ? [obj1, obj2] : undefined;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqueKeys = new Set([...keys1, ...keys2]);

  const differences: any = {};
  for (const key of uniqueKeys.keys()) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (typeof value1 === "object" && typeof value2 === "object") {
      const nestedDifferences = getObjectDifferences(value1, value2);
      if (nestedDifferences) {
        differences[key] = nestedDifferences;
      }
    } else if (value1 !== value2) {
      differences[key] = [value1, value2];
    }
  }

  return Object.keys(differences).length === 0 ? undefined : differences;
}
