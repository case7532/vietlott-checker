// Hàm tạo dữ liệu mẫu cho 100 kỳ xổ số gần nhất
export const generateMockDraws = (lotteryType = '655', count = 100) => {
  const maxNumber = lotteryType === '655' ? 55 : 45;
  const numbersPerDraw = 6;
  const draws = [];

  // Ngày hiện tại
  const today = new Date();

  for (let i = 0; i < count; i++) {
    // Tạo ngày cho mỗi kỳ (quay ngược về quá khứ, mỗi kỳ cách nhau 2-3 ngày)
    const drawDate = new Date(today);
    drawDate.setDate(today.getDate() - (i * 3));

    // Tạo 6 số ngẫu nhiên không trùng nhau
    const numbers = new Set();
    while (numbers.size < numbersPerDraw) {
      numbers.add(Math.floor(Math.random() * maxNumber) + 1);
    }

    // Sắp xếp các số theo thứ tự tăng dần
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    // Tạo số kỳ (ví dụ: 001234)
    const drawNumber = String(230000 + count - i).padStart(6, '0');

    // Tạo giải thưởng ngẫu nhiên
    const jackpot = lotteryType === '655'
      ? Math.floor(Math.random() * 100 + 20) * 1000000000 // 20-120 tỷ
      : Math.floor(Math.random() * 50 + 15) * 1000000000;  // 15-65 tỷ

    // Tạo số người trúng giải ngẫu nhiên
    const winners = {
      jackpot: Math.random() > 0.95 ? Math.floor(Math.random() * 3) + 1 : 0, // 5% có người trúng jackpot
      firstPrize: Math.floor(Math.random() * 20),
      secondPrize: Math.floor(Math.random() * 200),
      thirdPrize: Math.floor(Math.random() * 2000),
    };

    // Tính tổng tiền thưởng
    const totalPrize =
      (winners.jackpot * jackpot) +
      (winners.firstPrize * 10000000) +
      (winners.secondPrize * 300000) +
      (winners.thirdPrize * 30000);

    draws.push({
      id: drawNumber,
      drawNumber,
      date: drawDate,
      numbers: sortedNumbers,
      jackpot,
      winners,
      totalPrize,
      lotteryType,
    });
  }

  return draws;
};

// Hàm tính tần suất xuất hiện của các số
export const calculateNumberFrequency = (draws, maxNumber = 55) => {
  const frequency = {};

  // Khởi tạo frequency cho tất cả các số từ 1 đến maxNumber
  for (let i = 1; i <= maxNumber; i++) {
    frequency[i] = {
      number: i,
      count: 0,
      percentage: 0,
      lastAppeared: null,
    };
  }

  // Đếm tần suất
  draws.forEach((draw) => {
    draw.numbers.forEach((num) => {
      frequency[num].count++;
      if (!frequency[num].lastAppeared || draw.date > frequency[num].lastAppeared) {
        frequency[num].lastAppeared = draw.date;
      }
    });
  });

  // Tính phần trăm
  const totalDraws = draws.length;
  Object.keys(frequency).forEach((num) => {
    frequency[num].percentage = ((frequency[num].count / totalDraws) * 100).toFixed(2);
  });

  // Chuyển đổi thành array và sắp xếp theo tần suất giảm dần
  return Object.values(frequency).sort((a, b) => b.count - a.count);
};

// Hàm định dạng số tiền
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

// Hàm định dạng ngày
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateLong = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
