export const interpolate = (
  s: string,
  map: Record<string, string | number | boolean>
) => {
  const values = Object.values(map);
  const keys = Object.keys(map);
  return new Function(...keys, `return \`${s}\`;`)(values);
};
