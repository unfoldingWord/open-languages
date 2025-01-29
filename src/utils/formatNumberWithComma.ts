export function formatNumberWithComma(number: number | string) {
  const numberString = number?.toString();
  const characters = numberString?.split("");
  const result = [];

  for (let i = characters?.length - 1; i >= 0; i--) {
    if (
      i !== characters?.length - 1 &&
      (characters?.length - 1 - i) % 3 === 0
    ) {
      result.unshift(",");
    }
    result.unshift(characters[i]);
  }

  return result.join("");
}

export function roundOff(number: number) {
  if (typeof number !== "number") {
    return NaN;
  }
  return parseFloat(number.toFixed(2));
}
