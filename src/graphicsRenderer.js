const { createCanvas } = require("@napi-rs/canvas");
const fs = require("fs");
const { getColorByWinRate, getPeakIcon, formatDateTime } = require("./utils");

function renderInfographic(data, outputPath) {
  const WIDTH = 1600;
  const HEIGHT = 1200;
  const PADDING = 60;
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // 🔵 Nền tổng thể
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 🧢 HEADER
  ctx.fillStyle = "#005599"; // gradient đơn sắc
  ctx.fillRect(0, 0, WIDTH, 100);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px sans-serif";
  ctx.fillText(`${data.playerName} - Lv ${data.level}`, PADDING, 55);
  ctx.font = "20px sans-serif";
  ctx.fillText(`Tướng: ${data.heroes} | Trang phục: ${data.skins} | Like: ${data.likes}`, PADDING, 85);

  // 📊 BODY – Thống kê các chế độ
  ctx.font = "20px sans-serif";
  const lineHeight = 40;
  let y = 140;
  for (const [mode, stats] of Object.entries(data.modes)) {
    const bg = getColorByWinRate(stats.winRate);
    ctx.fillStyle = bg;
    ctx.fillRect(PADDING, y - 25, WIDTH - 2 * PADDING, lineHeight - 5);

    ctx.fillStyle = "#000000";
    ctx.fillText(
      `${mode}: ${stats.matches} trận – Tỷ lệ thắng: ${stats.winRate}%`,
      PADDING + 10,
      y
    );
    y += lineHeight;
  }

  // 👑 FOOTER – Điểm đỉnh cao & thời gian
  const icon = getPeakIcon(data.peakScore);
  ctx.font = "18px sans-serif";
  ctx.fillStyle = "#000000";
  ctx.fillText(`Điểm đỉnh cao: ${data.peakScore} ${icon}`, PADDING, HEIGHT - 60);
  ctx.fillText(`Thời gian tạo: ${formatDateTime()}`, WIDTH - 300, HEIGHT - 60);

  // 💾 Xuất file PNG
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Ảnh đã được lưu tại: ${outputPath}`);
}

module.exports = { renderInfographic };