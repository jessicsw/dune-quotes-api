const sanitizeQuery = (string: string): string => {
  const PREPOSITION = "of";
  const capitalizeFirstChar = (word: string) => {
    return word && word[0].toUpperCase() + word.slice(1);
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
