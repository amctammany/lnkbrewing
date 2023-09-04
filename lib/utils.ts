export function parseFloats<S extends Record<string, string>>(
  src: S,
  ...keys: (keyof S)[]
) {
  return keys.reduce((acc, k) => {
    acc[k] = parseFloat(src[k]);
    return acc;
  }, {} as Record<keyof S, number>);
}
