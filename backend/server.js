import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "data.json");

// Ensure file exists at startup
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([])); // create empty array
}

// Append new data
app.post("/append", (req, res) => {
  const newData = req.body; // array of objects
  let existing = [];

  try {
    existing = JSON.parse(fs.readFileSync(filePath));
  } catch (err) {
    existing = [];
  }

  existing.push(...newData);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  res.send({ message: "Data appended!" });
});

// Get saved data
app.get("/data", (req, res) => {
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(filePath));
  } catch (err) {
    data = [];
  }
  res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
