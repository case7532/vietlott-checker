// Service để gọi API Vietlott

const VIETLOTT_API_URL = 'http://vietlott.vn/Ajax/PrevNextResultGamePower655';

/**
 * Format date to MM/DD/YYYY for Vietlott API
 */
const formatDateForAPI = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

/**
 * Get game ID based on lottery type
 */
const getGameId = (lotteryType) => {
  return lotteryType === '655' ? '3' : '2'; // 3 = Mega 6/55, 2 = Power 6/45
};

/**
 * Fetch latest result for a specific date and lottery type
 */
export const fetchLatestResult = async (dateString, lotteryType) => {
  try {
    const response = await fetch(VIETLOTT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dayPrize: formatDateForAPI(dateString),
        type: '0', // 0 = latest
        gameId: getGameId(lotteryType),
        drawId: '999', // 999 = latest
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return parseVietlottResponse(data);
  } catch (error) {
    console.error('Error fetching Vietlott data:', error);
    throw error;
  }
};

/**
 * Fetch multiple results (for history)
 */
export const fetchDrawHistory = async (lotteryType, count = 100) => {
  try {
    const results = [];
    const today = new Date();

    // Vietlott draws happen multiple times per week, so we'll fetch incrementally
    let currentDrawId = '999'; // Start with latest

    for (let i = 0; i < count; i++) {
      const response = await fetch(VIETLOTT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dayPrize: formatDateForAPI(today),
          type: i === 0 ? '0' : '1', // 0 for first (latest), 1 for navigate
          gameId: getGameId(lotteryType),
          drawId: currentDrawId,
        }),
      });

      if (!response.ok) {
        break;
      }

      const data = await response.json();
      const parsed = parseVietlottResponse(data);

      if (parsed) {
        results.push(parsed);
        currentDrawId = parsed.id; // Use this draw ID for next iteration
      } else {
        break;
      }

      // Add small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return results;
  } catch (error) {
    console.error('Error fetching Vietlott history:', error);
    throw error;
  }
};

/**
 * Parse Vietlott API response to our format
 */
const parseVietlottResponse = (data) => {
  if (!data || !data.Result) {
    return null;
  }

  // The actual structure might vary - this is a guess based on common API patterns
  // You may need to adjust this based on the real response
  const result = data.Result;

  return {
    id: result.DrawId || result.id,
    drawNumber: result.DrawNumber || result.drawNumber,
    date: result.DrawDate || result.date,
    lotteryType: result.GameId === '3' ? '655' : '645',
    numbers: parseNumbers(result.Numbers || result.numbers),
    jackpot: parseInt(result.Jackpot || result.jackpot || 0),
    totalPrize: parseInt(result.TotalPrize || result.totalPrize || 0),
    winners: {
      jackpot: parseInt(result.Winners?.Jackpot || result.winners?.jackpot || 0),
      firstPrize: parseInt(result.Winners?.FirstPrize || result.winners?.firstPrize || 0),
      secondPrize: parseInt(result.Winners?.SecondPrize || result.winners?.secondPrize || 0),
      thirdPrize: parseInt(result.Winners?.ThirdPrize || result.winners?.thirdPrize || 0),
    },
  };
};

/**
 * Parse numbers from various formats
 */
const parseNumbers = (numbersData) => {
  if (Array.isArray(numbersData)) {
    return numbersData.map(n => parseInt(n));
  }

  if (typeof numbersData === 'string') {
    // Handle comma-separated or space-separated strings
    return numbersData
      .split(/[,\s]+/)
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n));
  }

  return [];
};

export default {
  fetchLatestResult,
  fetchDrawHistory,
};
