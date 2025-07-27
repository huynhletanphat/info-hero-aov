function getColorByWinRate(rate) {
  if (rate < 50) return "#ffdddd";      // 🔴 winrate thấp
  if (rate < 65) return "#fffacc";      // 🟡 trung bình
  if (rate >= 80) return "#ccf2ff";     // 💎 cao
  return "#ddffcc";                     // 🟢 khá
}

function getPeakIcon(score) {
  if (score < 1200) return "🔴";
  if (score <= 1400) return "🟢";
  if (score > 1800) return "👑";
  return "";
}

function formatDateTime() {
  const now = new Date();
  const d = now.getDate().toString().padStart(2, "0");
  const m = (now.getMonth() + 1).toString().padStart(2, "0");
  const y = now.getFullYear();
  const h = now.getHours().toString().padStart(2, "0");
  const min = now.getMinutes().toString().padStart(2, "0");
  return `${d}/${m}/${y} ${h}:${min}`;
}

module.exports = {
  getColorByWinRate,
  getPeakIcon,
  formatDateTime,
};