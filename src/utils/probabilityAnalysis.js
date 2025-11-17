// Phân tích xác suất thống kê để dự đoán các chuỗi số có khả năng trúng cao

/**
 * Tính xác suất xuất hiện của mỗi số dựa trên dữ liệu lịch sử
 */
export const calculateNumberProbabilities = (draws, maxNumber) => {
  const frequencies = {};

  // Đếm tần suất xuất hiện
  for (let i = 1; i <= maxNumber; i++) {
    frequencies[i] = 0;
  }

  draws.forEach(draw => {
    draw.numbers.forEach(num => {
      frequencies[num]++;
    });
  });

  // Tính xác suất (probability)
  const totalDraws = draws.length;
  const probabilities = {};

  for (let i = 1; i <= maxNumber; i++) {
    probabilities[i] = frequencies[i] / totalDraws;
  }

  return probabilities;
};

/**
 * Phân tích khoảng cách giữa các lần xuất hiện (Gap Analysis)
 */
export const analyzeGaps = (draws, maxNumber) => {
  const lastAppeared = {};
  const gaps = {};

  for (let i = 1; i <= maxNumber; i++) {
    gaps[i] = [];
    lastAppeared[i] = -1;
  }

  draws.forEach((draw, index) => {
    draw.numbers.forEach(num => {
      if (lastAppeared[num] !== -1) {
        gaps[num].push(index - lastAppeared[num]);
      }
      lastAppeared[num] = index;
    });
  });

  // Tính khoảng cách trung bình
  const avgGaps = {};
  for (let i = 1; i <= maxNumber; i++) {
    if (gaps[i].length > 0) {
      avgGaps[i] = gaps[i].reduce((a, b) => a + b, 0) / gaps[i].length;
    } else {
      avgGaps[i] = draws.length;
    }
  }

  return { gaps, avgGaps, lastAppeared };
};

/**
 * Tính hot numbers (số nóng - xuất hiện nhiều gần đây)
 */
export const getHotNumbers = (draws, recentCount = 20) => {
  const recentDraws = draws.slice(0, recentCount);
  const frequencies = {};

  recentDraws.forEach(draw => {
    draw.numbers.forEach(num => {
      frequencies[num] = (frequencies[num] || 0) + 1;
    });
  });

  return Object.entries(frequencies)
    .map(([num, count]) => ({ number: parseInt(num), count, probability: count / recentCount }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Tính cold numbers (số lạnh - lâu chưa xuất hiện)
 */
export const getColdNumbers = (draws, maxNumber) => {
  const { lastAppeared } = analyzeGaps(draws, maxNumber);

  return Object.entries(lastAppeared)
    .map(([num, lastIndex]) => ({
      number: parseInt(num),
      drawsSinceAppeared: lastIndex === -1 ? draws.length : lastIndex,
    }))
    .sort((a, b) => b.drawsSinceAppeared - a.drawsSinceAppeared);
};

/**
 * Phân tích cặp số (pair analysis) - số nào hay xuất hiện cùng nhau
 */
export const analyzePairs = (draws) => {
  const pairFrequencies = {};

  draws.forEach(draw => {
    const numbers = draw.numbers.sort((a, b) => a - b);
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        const pair = `${numbers[i]}-${numbers[j]}`;
        pairFrequencies[pair] = (pairFrequencies[pair] || 0) + 1;
      }
    }
  });

  return Object.entries(pairFrequencies)
    .map(([pair, count]) => {
      const [num1, num2] = pair.split('-').map(Number);
      return { num1, num2, count, probability: count / draws.length };
    })
    .sort((a, b) => b.count - a.count);
};

/**
 * Tính toán độ lệch chuẩn để đánh giá sự phân tán
 */
const calculateStdDev = (values) => {
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const squareDiffs = values.map(value => Math.pow(value - avg, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / values.length;
  return Math.sqrt(avgSquareDiff);
};

/**
 * Tạo các chuỗi số dự đoán dựa trên nhiều phương pháp thống kê
 */
export const generatePredictedCombinations = (draws, maxNumber = 55, numbersPerDraw = 6, count = 5) => {
  const probabilities = calculateNumberProbabilities(draws, maxNumber);
  const { avgGaps, lastAppeared } = analyzeGaps(draws, maxNumber);
  const hotNumbers = getHotNumbers(draws, 20);
  const coldNumbers = getColdNumbers(draws, maxNumber);
  const topPairs = analyzePairs(draws).slice(0, 10);

  const predictions = [];

  // Phương pháp 1: Kết hợp hot numbers + cold numbers (cân bằng)
  const method1 = {
    name: 'Phương pháp Cân bằng (Hot-Cold Balance)',
    description: 'Kết hợp các số "nóng" xuất hiện nhiều gần đây với số "lạnh" lâu chưa ra',
    strategy: 'Balanced Mix',
    numbers: [],
    confidence: 0,
  };

  const hotNums = hotNumbers.slice(0, 3).map(h => h.number);
  const coldNums = coldNumbers.slice(0, 3).map(c => c.number);
  method1.numbers = [...hotNums, ...coldNums].slice(0, numbersPerDraw).sort((a, b) => a - b);
  method1.confidence = (hotNumbers.slice(0, 3).reduce((sum, h) => sum + h.probability, 0) / 3) * 100;
  predictions.push(method1);

  // Phương pháp 2: Dựa trên xác suất cao nhất
  const method2 = {
    name: 'Phương pháp Xác suất Tần suất',
    description: 'Chọn các số có tần suất xuất hiện cao nhất trong lịch sử',
    strategy: 'High Frequency',
    numbers: [],
    confidence: 0,
  };

  const sortedByProb = Object.entries(probabilities)
    .sort((a, b) => b[1] - a[1])
    .slice(0, numbersPerDraw)
    .map(([num]) => parseInt(num));
  method2.numbers = sortedByProb.sort((a, b) => a - b);
  method2.confidence = (sortedByProb.reduce((sum, num) => sum + probabilities[num], 0) / numbersPerDraw) * 100;
  predictions.push(method2);

  // Phương pháp 3: Gap Analysis - số đến "hạn" xuất hiện
  const method3 = {
    name: 'Phương pháp Khoảng cách Thống kê',
    description: 'Chọn số dựa trên chu kỳ xuất hiện trung bình (overdue numbers)',
    strategy: 'Gap Analysis',
    numbers: [],
    confidence: 0,
  };

  const overdue = Object.entries(lastAppeared)
    .map(([num, lastIdx]) => {
      const numInt = parseInt(num);
      const currentGap = lastIdx;
      const expectedGap = avgGaps[numInt];
      return {
        number: numInt,
        overdueScore: currentGap / expectedGap,
      };
    })
    .filter(item => item.overdueScore > 1)
    .sort((a, b) => b.overdueScore - a.overdueScore)
    .slice(0, numbersPerDraw);

  method3.numbers = overdue.map(o => o.number).sort((a, b) => a - b);
  method3.confidence = Math.min(95, overdue.reduce((sum, o) => sum + Math.min(20, o.overdueScore * 10), 0));
  predictions.push(method3);

  // Phương pháp 4: Pair-based prediction
  const method4 = {
    name: 'Phương pháp Cặp số Liên kết',
    description: 'Chọn dựa trên các cặp số thường xuất hiện cùng nhau',
    strategy: 'Pair Association',
    numbers: [],
    confidence: 0,
  };

  const selectedNums = new Set();
  topPairs.forEach(pair => {
    if (selectedNums.size < numbersPerDraw) {
      selectedNums.add(pair.num1);
      if (selectedNums.size < numbersPerDraw) {
        selectedNums.add(pair.num2);
      }
    }
  });
  method4.numbers = Array.from(selectedNums).sort((a, b) => a - b);
  method4.confidence = (topPairs.slice(0, 3).reduce((sum, p) => sum + p.probability, 0) / 3) * 100;
  predictions.push(method4);

  // Phương pháp 5: Random weighted (dựa trên xác suất)
  const method5 = {
    name: 'Phương pháp Ngẫu nhiên có Trọng số',
    description: 'Chọn ngẫu nhiên nhưng ưu tiên số có xác suất cao hơn',
    strategy: 'Weighted Random',
    numbers: [],
    confidence: 0,
  };

  const weightedRandom = () => {
    const selected = new Set();
    const weights = Object.values(probabilities);
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    while (selected.size < numbersPerDraw) {
      let random = Math.random() * totalWeight;
      let sum = 0;

      for (let i = 1; i <= maxNumber; i++) {
        sum += probabilities[i];
        if (random <= sum && !selected.has(i)) {
          selected.add(i);
          break;
        }
      }
    }

    return Array.from(selected).sort((a, b) => a - b);
  };

  method5.numbers = weightedRandom();
  method5.confidence = (method5.numbers.reduce((sum, num) => sum + probabilities[num], 0) / numbersPerDraw) * 100;
  predictions.push(method5);

  return predictions;
};
