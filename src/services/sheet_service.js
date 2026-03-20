import { getAllDependents, addDependencies, hasCycle } from "../utils/graph.js";
import { evaluateExpression, extractCellReferences } from "../utils/parser.js";

const sheets = {}; 

const recalculate = (sheetId, cellId) => {
  const dependents = getAllDependents(cellId);

  for (let dep of dependents) {
    const cell = sheets[sheetId][dep];

    if (!cell || !cell.formula) continue;

    const expression = cell.formula.slice(1);
    const dependencies = extractCellReferences(expression);

    let computedExpression = expression;
    let error = null;

    for (let d of dependencies) {
      const dCell = sheets[sheetId][d];

      if (!dCell) {
        error = "#REF!";
        break;
      }

      if (typeof dCell.value === "string" && dCell.value.startsWith("#")) {
        error = dCell.value;
        break;
      }

      const regex = new RegExp(d, "g");
      computedExpression = computedExpression.replace(regex, dCell.value);
    }

    cell.value = error || evaluateExpression(computedExpression);
  }
};

export const setCell = (sheetId, cellId, value) => {
  if (!sheets[sheetId]) {
    sheets[sheetId] = {};
  }

  let finalValue = value;
  let formula = null;

  if (typeof value === "string" && value.startsWith("=")) {
    const expression = value.slice(1);

    const dependencies = extractCellReferences(expression);

    for (let dep of dependencies) {
      if (hasCycle(dep, cellId)) {
        sheets[sheetId][cellId] = {
          value: "#CYCLE!",
          formula: value,
        };

        recalculate(sheetId, cellId);

        return sheets[sheetId][cellId];
      }
    }

    let computedExpression = expression;
    let error = null;

    for (let dep of dependencies) {
      const depCell = sheets[sheetId][dep];

      if (!depCell) {
        error = "#REF!";
        break;
      }

      if (typeof depCell.value === "string" && depCell.value.startsWith("#")) {
        error = depCell.value;
        break;
      }

      const regex = new RegExp(dep, "g");
      computedExpression = computedExpression.replace(regex, depCell.value);
    }

    finalValue = error || evaluateExpression(computedExpression);

    addDependencies(cellId, dependencies);

    formula = value;
  }

  sheets[sheetId][cellId] = {
    value: finalValue,
    formula: formula,
  };

  recalculate(sheetId, cellId);

  return sheets[sheetId][cellId];
};

export const getCell = (sheetId, cellId) => {
  if (!sheets[sheetId] || !sheets[sheetId][cellId]) {
    return null;
  }

  return sheets[sheetId][cellId];
};