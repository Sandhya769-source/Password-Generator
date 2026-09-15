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

  // Password must be long enough
  // to contain one character from each selected type.
  if (length < selectedSets.length) {
    return "";
  }

  let passwordCharacters = "";

  // Guarantee at least one character
  // from every selected category.
  selectedSets.forEach((characterSet) => {
    passwordCharacters += getSecureRandomCharacter(
      characterSet
    );
  });

  // Combine all selected character sets.
  const allCharacters = selectedSets.join("");

  // Fill the remaining password positions.
  while (passwordCharacters.length < length) {
    passwordCharacters += getSecureRandomCharacter(
      allCharacters
    );
  }

  // Securely shuffle the password.
  return shufflePassword(passwordCharacters);
};

/*
 * Returns a cryptographically secure random character.
 */
const getSecureRandomCharacter = (characterSet) => {
  const randomValues = new Uint32Array(1);

  crypto.getRandomValues(randomValues);

  const randomIndex =
    randomValues[0] % characterSet.length;

  return characterSet[randomIndex];
};

/*
 * Securely shuffles the password characters.
 */
const shufflePassword = (password) => {
  const characters = password.split("");

  for (let i = characters.length - 1; i > 0; i--) {
    const randomValues = new Uint32Array(1);

    crypto.getRandomValues(randomValues);

    const randomIndex =
      randomValues[0] % (i + 1);

    [characters[i], characters[randomIndex]] = [
      characters[randomIndex],
      characters[i],
    ];
  }

  return characters.join("");
};

