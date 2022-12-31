export function getFirstLetters(string) {
  return string
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
