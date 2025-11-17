import { formatDateLong, formatCurrency } from '../utils/mockData';

function DrawDetail({ draw }) {
  if (!draw) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <p className="text-gray-500">Chọn một kỳ để xem chi tiết</p>
      </div>
    );
  }

  const lotteryName = draw.lotteryType === '655' ? 'Mega 6/55' : 'Power 6/45';
  const prizeStructure = [
    {
      name: 'Jackpot (6 số)',
      unitPrize: formatCurrency(draw.jackpot),
      winners: draw.winners.jackpot,
      total: draw.winners.jackpot * draw.jackpot,
    },
    {
      name: 'Giải nhất (5 số)',
      unitPrize: '10.000.000',
      winners: draw.winners.firstPrize,
      total: draw.winners.firstPrize * 10000000,
    },
    {
      name: 'Giải nhì (4 số)',
      unitPrize: '300.000',
      winners: draw.winners.secondPrize,
      total: draw.winners.secondPrize * 300000,
    },
    {
      name: 'Giải ba (3 số)',
      unitPrize: '30.000',
      winners: draw.winners.thirdPrize,
      total: draw.winners.thirdPrize * 30000,
    },
  ];

  const totalWinners =
    draw.winners.jackpot +
    draw.winners.firstPrize +
    draw.winners.secondPrize +
    draw.winners.thirdPrize;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Chi tiết kỳ quay</h2>
        <p className="text-xl text-indigo-600 font-semibold">
          {lotteryName} - Kỳ #{draw.drawNumber}
        </p>
        <p className="text-gray-600 mt-1">{formatDateLong(draw.date)}</p>
      </div>

      {/* Winning Numbers */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          Các số trúng thưởng
        </h3>
        <div className="flex justify-center gap-3 flex-wrap">
          {draw.numbers.map((number, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
            >
              {number}
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-200">
          <p className="text-sm text-gray-600 text-center mb-1">Tổng số người trúng</p>
          <p className="text-3xl font-bold text-orange-600 text-center">
            {formatCurrency(totalWinners)}
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
          <p className="text-sm text-gray-600 text-center mb-1">Tổng tiền thưởng</p>
          <p className="text-2xl font-bold text-green-600 text-center">
            {formatCurrency(draw.totalPrize)} VNĐ
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
          <p className="text-sm text-gray-600 text-center mb-1">Jackpot</p>
          <p className="text-2xl font-bold text-purple-600 text-center">
            {formatCurrency(draw.jackpot)} VNĐ
          </p>
        </div>
      </div>

      {/* Prize Breakdown Table */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Chi tiết giải thưởng
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Loại giải
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">
                  Giá trị/người
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">
                  Số người trúng
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">
                  Tổng tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {prizeStructure.map((prize, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${
                    prize.winners > 0 ? 'bg-green-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-4 py-4 font-semibold text-gray-800">
                    {prize.name}
                    {prize.winners > 0 && index === 0 && (
                      <span className="ml-2 text-xs text-green-600">🎉</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right text-indigo-600 font-semibold">
                    {prize.unitPrize} VNĐ
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-gray-800">
                    {formatCurrency(prize.winners)}
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-green-600">
                    {formatCurrency(prize.total)} VNĐ
                  </td>
                </tr>
              ))}
              <tr className="bg-indigo-100 font-bold">
                <td className="px-4 py-4 text-gray-800" colSpan="2">
                  Tổng cộng
                </td>
                <td className="px-4 py-4 text-right text-gray-800">
                  {formatCurrency(totalWinners)}
                </td>
                <td className="px-4 py-4 text-right text-indigo-600">
                  {formatCurrency(draw.totalPrize)} VNĐ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Special Notice */}
      {draw.winners.jackpot > 0 && (
        <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-xl p-4">
          <p className="text-center font-bold text-orange-800">
            🎊 Kỳ này có {draw.winners.jackpot} người trúng Jackpot với tổng giá trị{' '}
            {formatCurrency(draw.winners.jackpot * draw.jackpot)} VNĐ!
          </p>
        </div>
      )}
    </div>
  );
}

export default DrawDetail;
