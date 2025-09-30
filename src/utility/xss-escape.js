/** Disclaimer: This method prevents common XSS-attacks, but NOT all of them. */
export function xssEscape(str) {
  // Force to string to avoid errors
  str = String(str);

  const escapedCharactersTable = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  /** Return result based on regex literal...
   * /.../ -> regex literal
   * [...] -> a character class (match any of these chars)
   * Character "g" stands for global, so it finds all matches, not just the first one
   *
   * When replace() is called with a function, the function is invoked once for each match.
   * The first (and only in this case) arg, 'match' is the actual matched substring from the regex literal.
   * The 'match' is used as a key to get the replacement value from the object escapedCharactersTable.
   */
  return str.replace(/[&<>"']/g, function (match) {
    return escapedCharactersTable[match];
  });
}
