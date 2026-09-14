export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      label: "Not Generated",
      level: 0,
    };
  }

  let score = 0;

  // Password length
  if (password.length >= 8) {
    score++;
  }

  if (password.length >= 12) {
    score++;
  }

  if (password.length >= 16) {
    score++;
  }

  // Character types
  if (/[A-Z]/.test(password)) {
    score++;
  }

  if (/[a-z]/.test(password)) {
    score++;
  }

  if (/[0-9]/.test(password)) {
    score++;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  }

  if (score <= 3) {
    return {
      label: "Weak",
      level: 2,
    };
  }

  if (score <= 5) {
    return {
      label: "Medium",
      level: 3,
    };
  }

  if (score <= 6) {
    return {
      label: "Strong",
      level: 4,
    };
  }

  return {
    label: "Very Strong",
    level: 5,
  };
};