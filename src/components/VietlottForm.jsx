import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VietlottForm() {
  const navigate = useNavigate();

  // Lấy ngày hiện tại và định dạng theo YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedLottery, setSelectedLottery] = useState('655');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chuyển hướng đến trang kết quả với dữ liệu
    navigate('/result', {
      state: {
        selectedDate,
        selectedLottery
      }
    });
  };

  const handleReset = () => {
    setSelectedDate(getCurrentDate());
    setSelectedLottery('655');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Kiểm tra kết quả Vietlott
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Input */}
          <div>
            <label htmlFor="date-input" className="block text-sm font-semibold text-gray-700 mb-2">
              Chọn ngày quay thưởng:
            </label>
            <input
              type="date"
              id="date-input"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          {/* Lottery Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Chọn loại giải:
            </label>
            <div className="space-y-3">
              {/* Mega 6/55 */}
              <label
                htmlFor="lottery-655"
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition duration-200 ${
                  selectedLottery === '655'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-300'
                }`}
              >
                <input
                  type="radio"
                  id="lottery-655"
                  name="lottery"
                  value="655"
                  checked={selectedLottery === '655'}
                  onChange={(e) => setSelectedLottery(e.target.value)}
                  className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-3 text-gray-800 font-semibold">Mega 6/55</span>
              </label>

              {/* Power 6/45 */}
              <label
                htmlFor="lottery-645"
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition duration-200 ${
                  selectedLottery === '645'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-300'
                }`}
              >
                <input
                  type="radio"
                  id="lottery-645"
                  name="lottery"
                  value="645"
                  checked={selectedLottery === '645'}
                  onChange={(e) => setSelectedLottery(e.target.value)}
                  className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-3 text-gray-800 font-semibold">Power 6/45</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
            >
              Kiểm tra kết quả
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
            >
              Làm mới
            </button>
          </div>
        </form>

        {/* Info Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Kết quả xổ số chỉ mang tính chất tham khảo
          </p>
        </div>
      </div>
    </div>
  );
}

export default VietlottForm;
