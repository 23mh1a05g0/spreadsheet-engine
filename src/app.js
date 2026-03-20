import express from "express";
import healthRoutes from "./routes/health.routes.js";
import sheetRoutes from "./routes/sheet_routes.js";

const app = express();

app.use(express.json());

app.use("/", healthRoutes);
app.use("/", sheetRoutes);

export default app;