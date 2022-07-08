export function parseNumericString(input: unknown): number {
  if (typeof input === 'number') {
    return input;
  }

  const value = input as string;
  return parseFloat(
    value.indexOf(',') > 0
      ? value.replaceAll(',', '.')
      : value,
  );
}

export function range({ from = 0, to }:{from: number, to: number}):ReadonlyArray<number> {
  return [...Array(to).keys()].map((i) => i + from);
}
