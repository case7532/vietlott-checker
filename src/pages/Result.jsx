import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DrawsList from '../components/DrawsList';
import DrawDetail from '../components/DrawDetail';
import FrequencyAnalysis from '../components/FrequencyAnalysis';
import { generateMockDraws, calculateNumberFrequency } from '../utils/mockData';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDate, selectedLottery } = location.state || {};

  const [activeTab, setActiveTab] = useState('draws'); // 'draws', 'detail', 'frequency'
  const [selectedDraw, setSelectedDraw] = useState(null);

  // Generate mock data
  const draws = useMemo(() => {
    return generateMockDraws(selectedLottery || '655', 100);
  }, [selectedLottery]);

  const maxNumber = selectedLottery === '655' ? 55 : 45;
  const frequencyData = useMemo(() => {
    return calculateNumberFrequency(draws, maxNumber);
  }, [draws, maxNumber]);

  const handleSelectDraw = (draw) => {
    setSelectedDraw(draw);
    setActiveTab('detail');
  };

  if (!selectedDate || !selectedLottery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không có dữ liệu</h2>
          <p className="text-gray-600 mb-6">Vui lòng chọn ngày và loại giải để kiểm tra kết quả.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const lotteryName = selectedLottery === '655' ? 'Mega 6/55' : 'Power 6/45';

  const tabs = [
    { id: 'draws', label: 'Danh sách kỳ quay', icon: '📋' },
    { id: 'detail', label: 'Chi tiết kỳ quay', icon: '🔍' },
    { id: 'frequency', label: 'Thống kê tần suất', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2 mx-auto"
          >
            ← Quay lại trang chủ
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Kết quả xổ số</h1>
          <p className="text-2xl text-indigo-600 font-semibold">{lotteryName}</p>
          <p className="text-gray-600 mt-2">Dữ liệu 100 kỳ quay gần nhất</p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-6">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[150px] py-4 px-6 rounded-xl font-semibold transition duration-200 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'draws' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DrawsList
                draws={draws}
                onSelectDraw={handleSelectDraw}
                selectedDrawId={selectedDraw?.id}
              />
              <DrawDetail draw={selectedDraw} />
            </div>
          )}

          {activeTab === 'detail' && (
            <div className="max-w-4xl mx-auto">
              <DrawDetail draw={selectedDraw} />
              {selectedDraw && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setActiveTab('draws')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
                  >
                    Xem danh sách kỳ quay
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'frequency' && (
            <div className="max-w-4xl mx-auto">
              <FrequencyAnalysis frequencyData={frequencyData} maxNumber={maxNumber} />
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 italic">
            * Đây là dữ liệu mẫu phục vụ demo. Kết quả chính thức vui lòng kiểm tra tại website Vietlott.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Result;
