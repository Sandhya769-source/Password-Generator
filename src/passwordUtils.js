import { CHARACTER_SETS } from "./constants";

export const generatePassword = ({
  length,
  uppercase,
  lowercase,
  numbers,
  symbols,
}) => {
  let characters = "";

  if (uppercase) {
    characters += CHARACTER_SETS.uppercase;
  }

  if (lowercase) {
    characters += CHARACTER_SETS.lowercase;
  }

  if (numbers) {
    characters += CHARACTER_SETS.numbers;
  }

  if (symbols) {
    characters += CHARACTER_SETS.symbols;
  }

  // No character type selected
  if (!characters) {
    return "";
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(
      Math.random() * characters.length
    );

    password += characters[randomIndex];
  }

  return password;
};