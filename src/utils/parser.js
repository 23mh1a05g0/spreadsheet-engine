export const evaluateExpression = (expression) => {
  try {
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      return "#ERROR!";
    }

    const result = Function(`"use strict"; return (${expression})`)();

    if (!isFinite(result)) {
      return "#DIV/0!";
    }

    return result;
  } catch (err) {
    return "#ERROR!";
  }
};

export const extractCellReferences = (expression) => {
  const regex = /[A-Z]+[0-9]+/g;
  return expression.match(regex) || [];
};