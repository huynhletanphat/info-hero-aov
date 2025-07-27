function parsePlayerData(text) {
  const result = {
    playerName: "",
    level: 0,
    likes: 0,
    heroes: 0,
    skins: 0,
    peakScore: 0,
    modes: {}
  };

  // Loại bỏ khoảng trắng đặc biệt và chuẩn hóa
  const clean = text.replace(/\u3164/g, ' ').replace(/\s+/g, ' ').trim();

  // Trích xuất phần thông tin tổng quan
  const head = clean.match(/^([\w\d_]+) Lv (\d+) Trận:\d+ Tỷ lệ thắng:[\d.]+% Like:(\d+) Tướng:(\d+) Tr\.phục:(\d+) Điểm đỉnh cao:(\d+)/);
  if (!head) throw new Error("❌ Không thể phân tích thông tin người chơi");

  result.playerName = head[1];
  result.level = parseInt(head[2]);
  result.likes = parseInt(head[3]);
  result.heroes = parseInt(head[4]);
  result.skins = parseInt(head[5]);
  result.peakScore = parseInt(head[6]);

  // Trích xuất các chế độ chơi chính
  const targetModes = ["Hạng", "Đấu tổ hợp", "Đấu bộ ba", "Chức vô địch"];
  const modeRe = /([A-Z0-9a-zÀ-Ỵà-ỵ \-<>().]+?) Số trận:(\d+) Tỷ lệ thắng:(\d+(?:\.\d+)?)%/g;

  let match;
  while ((match = modeRe.exec(clean)) !== null) {
    const modeName = match[1].trim();
    const matchCount = parseInt(match[2]);
    const winRate = parseFloat(match[3]);
    if (matchCount > 0 && targetModes.includes(modeName)) {
      result.modes[modeName] = {
        matches: matchCount,
        winRate
      };
    }
  }

  return result;
}

module.exports = { parsePlayerData };