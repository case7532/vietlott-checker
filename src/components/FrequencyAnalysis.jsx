import { useState } from 'react';
import { formatDate } from '../utils/mockData';

function FrequencyAnalysis({ frequencyData, maxNumber = 55 }) {
  const [sortBy, setSortBy] = useState('frequency'); // 'frequency' or 'number'

  const sortedData = [...frequencyData].sort((a, b) => {
    if (sortBy === 'frequency') {
      return b.count - a.count;
    }
    return a.number - b.number;
  });

  // Tìm giá trị max để tính độ rộng thanh
  const maxCount = Math.max(...frequencyData.map((d) => d.count));

  // Hàm để lấy màu dựa trên tần suất
  const getColorClass = (count) => {
    const percentage = (count / maxCount) * 100;
    if (percentage >= 80) return 'from-red-500 to-orange-500';
    if (percentage >= 60) return 'from-orange-500 to-yellow-500';
    if (percentage >= 40) return 'from-yellow-500 to-green-500';
    if (percentage >= 20) return 'from-green-500 to-blue-500';
    return 'from-blue-500 to-indigo-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Thống kê tần suất xuất hiện
        </h2>
        <p className="text-gray-600">
          Phân tích {maxNumber} số từ 100 kỳ quay gần nhất
        </p>
      </div>

      {/* Sort Controls */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSortBy('frequency')}
          className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
            sortBy === 'frequency'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Sắp xếp theo tần suất
        </button>
        <button
          onClick={() => setSortBy('number')}
          className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
            sortBy === 'number'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Sắp xếp theo số
        </button>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-200">
          <p className="text-sm text-gray-600 mb-1">Số xuất hiện nhiều nhất</p>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {sortedData[0].number}
            </div>
            <span className="text-lg font-bold text-gray-800">
              {sortedData[0].count} lần ({sortedData[0].percentage}%)
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Số xuất hiện ít nhất</p>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {sortedData[sortedData.length - 1].number}
            </div>
            <span className="text-lg font-bold text-gray-800">
              {sortedData[sortedData.length - 1].count} lần (
              {sortedData[sortedData.length - 1].percentage}%)
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
          <p className="text-sm text-gray-600 mb-1">Tần suất trung bình</p>
          <span className="text-2xl font-bold text-green-600">
            {(frequencyData.reduce((sum, d) => sum + d.count, 0) / frequencyData.length).toFixed(1)} lần
          </span>
        </div>
      </div>

      {/* Frequency Bars */}
      <div className="max-h-[800px] overflow-y-auto pr-2">
        <div className="space-y-3">
          {sortedData.map((data) => (
            <div key={data.number} className="group">
              <div className="flex items-center gap-3">
                {/* Number Ball */}
                <div className={`w-12 h-12 bg-gradient-to-br ${getColorClass(data.count)} rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-md group-hover:scale-110 transition duration-200`}>
                  {data.number}
                </div>

                {/* Progress Bar Container */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">
                      Xuất hiện {data.count} lần
                    </span>
                    <span className="text-sm font-bold text-indigo-600">
                      {data.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getColorClass(data.count)} transition-all duration-500 rounded-full`}
                      style={{ width: `${(data.count / maxCount) * 100}%` }}
                    />
                  </div>
                  {data.lastAppeared && (
                    <p className="text-xs text-gray-500 mt-1">
                      Lần cuối: {formatDate(data.lastAppeared)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <p className="text-sm font-semibold text-gray-700 mb-2">Chú thích màu sắc:</p>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded"></div>
            <span className="text-xs text-gray-600">Rất cao (80-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded"></div>
            <span className="text-xs text-gray-600">Cao (60-80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-green-500 rounded"></div>
            <span className="text-xs text-gray-600">Trung bình (40-60%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
            <span className="text-xs text-gray-600">Thấp (20-40%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded"></div>
            <span className="text-xs text-gray-600">Rất thấp (0-20%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrequencyAnalysis;
