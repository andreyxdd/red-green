function parseStringNumbers(input: unknown): number {
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

export default parseStringNumbers;
