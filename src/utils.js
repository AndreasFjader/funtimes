function removeStringQuotes(input) {
  if (startsAndEndsWithQuotes(input)) {
    return input.slice(1, -1);
  }

  return input;
}

function startsAndEndsWithQuotes(input) {
  return (input.startsWith("'") && input.endsWith("'")) || (input.startsWith('"') && input.endsWith('"'));
}

module.exports = { removeStringQuotes };