import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import DrawsList from '../components/DrawsList';
import DrawDetail from '../components/DrawDetail';
import FrequencyAnalysis from '../components/FrequencyAnalysis';
import { generateMockDraws, calculateNumberFrequency } from '../utils/mockData';
import { fetchDrawHistory } from '../services/vietlottApi';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDate, selectedLottery } = location.state || {};

  const [activeTab, setActiveTab] = useState(0);
  const [selectedDraw, setSelectedDraw] = useState(null);
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);

  // Fetch data from Vietlott API
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedLottery) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchDrawHistory(selectedLottery, 100);

        if (data && data.length > 0) {
          setDraws(data);
          setUseMockData(false);
        } else {
          // Fallback to mock data if API returns empty
          setDraws(generateMockDraws(selectedLottery, 100));
          setUseMockData(true);
        }
      } catch (err) {
        console.error('Failed to fetch from API, using mock data:', err);
        // Fallback to mock data on error
        setDraws(generateMockDraws(selectedLottery, 100));
        setUseMockData(true);
        setError('Không thể kết nối tới server Vietlott. Hiển thị dữ liệu mẫu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedLottery]);

  const maxNumber = selectedLottery === '655' ? 55 : 45;
  const frequencyData = useMemo(() => {
    return calculateNumberFrequency(draws, maxNumber);
  }, [draws, maxNumber]);

  const handleSelectDraw = (draw) => {
    setSelectedDraw(draw);
    setActiveTab(1);
  };

  if (!selectedDate || !selectedLottery) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #c5cae9 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Paper elevation={6} sx={{ p: 4, maxWidth: 400, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Không có dữ liệu
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Vui lòng chọn ngày và loại giải để kiểm tra kết quả.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
          >
            Quay lại
          </Button>
        </Paper>
      </Box>
    );
  }

  const lotteryName = selectedLottery === '655' ? 'Mega 6/55' : 'Power 6/45';

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #c5cae9 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={6} sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" fontWeight="bold">
            Đang tải dữ liệu...
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Vui lòng đợi trong giây lát
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #c5cae9 100%)',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="xl">
        {/* Error Alert */}
        {error && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Button
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Quay lại trang chủ
          </Button>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Kết quả xổ số
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="600">
            {lotteryName}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Dữ liệu 100 kỳ quay gần nhất
          </Typography>
        </Box>

        {/* Tabs Navigation */}
        <Paper elevation={3} sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                py: 2,
                fontWeight: 600,
              },
            }}
          >
            <Tab icon={<ListAltIcon />} label="Danh sách kỳ quay" iconPosition="start" />
            <Tab icon={<SearchIcon />} label="Chi tiết kỳ quay" iconPosition="start" />
            <Tab icon={<BarChartIcon />} label="Thống kê tần suất" iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Box>
          {activeTab === 0 && (
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
              <DrawsList
                draws={draws}
                onSelectDraw={handleSelectDraw}
                selectedDrawId={selectedDraw?.id}
              />
            </Box>
          )}

          {activeTab === 1 && (
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
              <DrawDetail draw={selectedDraw} />
              {selectedDraw && (
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() => setActiveTab(0)}
                  >
                    Xem danh sách kỳ quay
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {activeTab === 2 && (
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
              <FrequencyAnalysis frequencyData={frequencyData} maxNumber={maxNumber} draws={draws} />
            </Box>
          )}
        </Box>

        {/* Footer Note */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4, fontStyle: 'italic' }}
        >
          {useMockData
            ? '* Đây là dữ liệu mẫu phục vụ demo. Kết quả chính thức vui lòng kiểm tra tại website Vietlott.'
            : '* Dữ liệu được lấy từ Vietlott. Kết quả chỉ mang tính chất tham khảo.'}
        </Typography>
      </Container>
    </Box>
  );
}

export default Result;
