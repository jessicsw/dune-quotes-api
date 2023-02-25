const sanitizeQuery = (string) => {
  if (!string) return {};

  const PREPOSITION = "of";
  const capitalizeFirstChar = (string) => {
    return string && string[0].toUpperCase() + string.slice(1);
  };
  const sanitizedQuery = string
    .split("-")
    .map((word) => {
      if (word !== PREPOSITION) {
        return capitalizeFirstChar(word);
      } else {
        return word;
      }
    })
    .join(" ");

  return sanitizedQuery;
};

export default sanitizeQuery;
