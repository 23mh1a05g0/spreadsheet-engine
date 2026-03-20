import { setCell, getCell } from "../services/sheet_service.js";

export const setCellController = (req, res) => {
  const { sheet_id, cell_id } = req.params;
  const { value } = req.body;

  const cell = setCell(sheet_id, cell_id, value);

  res.status(200).json(cell);
};

export const getCellController = (req, res) => {
  const { sheet_id, cell_id } = req.params;

  const cell = getCell(sheet_id, cell_id);

  if (!cell) {
    return res.status(404).json({
      error: "Cell not found",
    });
  }

  res.status(200).json(cell);
};