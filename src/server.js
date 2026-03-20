import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.API_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});