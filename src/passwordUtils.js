import { CHARACTER_SETS } from "./constants";

export const generatePassword = ({
  length,
  uppercase,
  lowercase,
  numbers,
  symbols,
}) => {
  const selectedSets = [];

  if (uppercase) {
    selectedSets.push(CHARACTER_SETS.uppercase);
  }

  if (lowercase) {
    selectedSets.push(CHARACTER_SETS.lowercase);
  }

  if (numbers) {
    selectedSets.push(CHARACTER_SETS.numbers);
  }

  if (symbols) {
    selectedSets.push(CHARACTER_SETS.symbols);
  }

  // No character type selected
  if (selectedSets.length === 0) {
    return "";
  }

  // Password length cannot be smaller than
  // the number of selected character types.
  if (length < selectedSets.length) {
    return "";
  }

  let passwordCharacters = "";

  // Guarantee at least one character
  // from every selected category.
  selectedSets.forEach((characterSet) => {
    const randomIndex = Math.floor(
      Math.random() * characterSet.length
    );

    passwordCharacters += characterSet[randomIndex];
  });

  // Combine all selected character sets.
  const allCharacters = selectedSets.join("");

  // Fill the remaining password positions.
  while (passwordCharacters.length < length) {
    const randomIndex = Math.floor(
      Math.random() * allCharacters.length
    );

    passwordCharacters += allCharacters[randomIndex];
  }

  // Shuffle the password so the guaranteed
  // characters aren't always at the beginning.
  return shufflePassword(passwordCharacters);
};

const shufflePassword = (password) => {
  const characters = password.split("");

  for (let i = characters.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1)
    );

    [characters[i], characters[randomIndex]] = [
      characters[randomIndex],
      characters[i],
    ];
  }

  return characters.join("");
};