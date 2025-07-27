const fs = require("fs");
const path = require("path");
const { parsePlayerData } = require("./dataProcessor");
const { renderInfographic } = require("./graphicsRenderer");

const INPUT_PATH = path.join(__dirname, "../data/input.txt");
const OUTPUT_PATH = path.join(__dirname, "../data/output.png");
const ERROR_LOG_PATH = path.join(__dirname, "../data/error.log");

function logError(err) {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] ${err.stack || err.message || err}\n`;
  fs.appendFileSync(ERROR_LOG_PATH, message);
  console.error("❌ Lỗi! Xem chi tiết tại:", ERROR_LOG_PATH);
}

function run() {
  console.log("📥 Đang đọc dữ liệu từ input.txt...");

  try {
    const rawText = fs.readFileSync(INPUT_PATH, "utf-8");
    const parsedData = parsePlayerData(rawText);

    console.log("✅ Phân tích dữ liệu thành công:");
    console.log(`👤 Người chơi: ${parsedData.playerName} | Lv ${parsedData.level}`);
    console.log(`🎮 Các chế độ sẽ được thống kê:`, Object.keys(parsedData.modes).join(", "));

    console.log("🖼️ Đang tạo ảnh thống kê...");
    renderInfographic(parsedData, OUTPUT_PATH);

  } catch (err) {
    logError(err);
  }
}

run();