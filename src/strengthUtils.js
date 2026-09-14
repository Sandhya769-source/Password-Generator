export const calculatePasswordStrength = ({
  length,
  uppercase,
  lowercase,
  numbers,
  symbols,
}) => {
  let score = 0;

  // Password length
  if (length >= 8) {
    score++;
  }

  if (length >= 12) {
    score++;
  }

  if (length >= 16) {
    score++;
  }

  // Character types
  if (uppercase) {
    score++;
  }

  if (lowercase) {
    score++;
  }

  if (numbers) {
    score++;
  }

  if (symbols) {
    score++;
  }

  if (score <= 2) {
    return {
      label: "Weak",
      level: 1,
    };
  }

  if (score <= 4) {
    return {
      label: "Medium",
      level: 3,
    };
  }

  return {
    label: "Strong",
    level: 5,
  };
};