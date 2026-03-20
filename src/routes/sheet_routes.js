import express from "express";
import {
  setCellController,
  getCellController,
} from "../controllers/sheet_controller.js";

const router = express.Router();

router.put("/api/sheets/:sheet_id/cells/:cell_id", setCellController);

router.get("/api/sheets/:sheet_id/cells/:cell_id", getCellController);

export default router;