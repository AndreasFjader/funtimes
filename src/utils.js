/**
 * Removes '' or "" from an input.
 * @param {string} input
 * @returns a new string not surrounded by '' or "".
 */
function removeStringQuotes(input) {
  if (startsAndEndsWithQuotes(input)) {
    return removeStringQuotes(input.slice(1, -1));
  }

  return input;
}

function startsAndEndsWithQuotes(input) {
  return (input.startsWith("'") && input.endsWith("'")) || (input.startsWith('"') && input.endsWith('"'));
}

module.exports = { removeStringQuotes };