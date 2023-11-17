function manipulateInput(input) {
  const inputIsNumerical = Number(input);
  if (typeof inputIsNumerical === Number) {
    return inputIsNumerical;
  }

  // It's possible that the selected text was already wrapped in ''.
  // Make sure '' are removed from numerical inputs, and excess '' are removed for strings.
  

}

module.exports = { manipulateInput };