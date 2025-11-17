import { formatDate, formatCurrency } from '../utils/mockData';

function DrawsList({ draws, onSelectDraw, selectedDrawId }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        100 kỳ quay gần nhất
      </h2>

      <div className="max-h-[600px] overflow-y-auto pr-2">
        <div className="space-y-2">
          {draws.map((draw) => (
            <button
              key={draw.id}
              onClick={() => onSelectDraw(draw)}
              className={`w-full text-left p-4 rounded-lg border-2 transition duration-200 hover:shadow-md ${
                selectedDrawId === draw.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-gray-800">Kỳ #{draw.drawNumber}</span>
                  <p className="text-sm text-gray-600">{formatDate(draw.date)}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">Jackpot</span>
                  <p className="font-bold text-orange-600 text-sm">
                    {formatCurrency(draw.jackpot)} VNĐ
                  </p>
                </div>
              </div>

              <div className="flex gap-1 flex-wrap">
                {draw.numbers.map((num, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  >
                    {num}
                  </div>
                ))}
              </div>

              {draw.winners.jackpot > 0 && (
                <div className="mt-2 text-xs text-green-600 font-semibold">
                  🎉 Có {draw.winners.jackpot} người trúng Jackpot!
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DrawsList;
