require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 9000;
const DATA_FILE = process.env.DATA_FILE || "./data/decorations.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 讀取 JSON 檔案
function readData() {
  if (!fs.existsSync(DATA_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (error) {
    console.error("Error reading JSON:", error);
    return {};
  }
}

// 寫入 JSON 檔案
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing JSON:", error);
  }
}

// **API: 取得使用者的裝飾狀態**
app.get("/decorations/state", (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const data = readData();
  if (data[userId]) {
    res.json(data[userId]);
  } else {
    res.status(404).json({ error: "Decoration not found" });
  }
});

// **API: 儲存使用者的裝飾狀態**
app.post("/decorations/state", (req, res) => {
  const { userId, decorationId, timestamp } = req.body;

  if (!userId || !decorationId || !timestamp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const data = readData();
  data[userId] = { decorationId, timestamp };
  writeData(data);

  res.json({
    success: true,
    message: "Decoration preference saved",
    data: data[userId],
  });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
