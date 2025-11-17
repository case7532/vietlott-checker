import { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  ButtonGroup,
  Chip,
  LinearProgress,
  Grid,
  Stack,
} from '@mui/material';
import { formatDate } from '../utils/mockData';

function FrequencyAnalysis({ frequencyData, maxNumber = 55 }) {
  const [sortBy, setSortBy] = useState('frequency'); // 'frequency' or 'number'

  const sortedData = [...frequencyData].sort((a, b) => {
    if (sortBy === 'frequency') {
      return b.count - a.count;
    }
    return a.number - b.number;
  });

  const maxCount = Math.max(...frequencyData.map((d) => d.count));

  const getColorGradient = (count) => {
    const percentage = (count / maxCount) * 100;
    if (percentage >= 80) return { from: '#f44336', to: '#ff9800' };
    if (percentage >= 60) return { from: '#ff9800', to: '#ffeb3b' };
    if (percentage >= 40) return { from: '#ffeb3b', to: '#4caf50' };
    if (percentage >= 20) return { from: '#4caf50', to: '#2196f3' };
    return { from: '#2196f3', to: '#3f51b5' };
  };

  const getChipColor = (count) => {
    const percentage = (count / maxCount) * 100;
    if (percentage >= 80) return 'error';
    if (percentage >= 60) return 'warning';
    if (percentage >= 40) return 'success';
    if (percentage >= 20) return 'info';
    return 'primary';
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Thống kê tần suất xuất hiện
        </Typography>
        <Typography color="text.secondary">
          Phân tích {maxNumber} số từ 100 kỳ quay gần nhất
        </Typography>
      </Box>

      {/* Sort Controls */}
      <ButtonGroup sx={{ mb: 3 }} fullWidth>
        <Button
          variant={sortBy === 'frequency' ? 'contained' : 'outlined'}
          onClick={() => setSortBy('frequency')}
        >
          Sắp xếp theo tần suất
        </Button>
        <Button
          variant={sortBy === 'number' ? 'contained' : 'outlined'}
          onClick={() => setSortBy('number')}
        >
          Sắp xếp theo số
        </Button>
      </ButtonGroup>

      {/* Statistics Grid */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'error.50', borderColor: 'error.main' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Số xuất hiện nhiều nhất
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={sortedData[0].number}
                color="error"
                sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
              />
              <Typography fontWeight="bold">
                {sortedData[0].count} lần ({sortedData[0].percentage}%)
              </Typography>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'primary.50', borderColor: 'primary.main' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Số xuất hiện ít nhất
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={sortedData[sortedData.length - 1].number}
                color="primary"
                sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
              />
              <Typography fontWeight="bold">
                {sortedData[sortedData.length - 1].count} lần (
                {sortedData[sortedData.length - 1].percentage}%)
              </Typography>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.50', borderColor: 'success.main' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Tần suất trung bình
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="success.main">
              {(frequencyData.reduce((sum, d) => sum + d.count, 0) / frequencyData.length).toFixed(1)} lần
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Frequency Bars */}
      <Box sx={{ maxHeight: 800, overflow: 'auto' }}>
        <Stack spacing={2}>
          {sortedData.map((data) => {
            const colors = getColorGradient(data.count);
            const chipColor = getChipColor(data.count);

            return (
              <Box
                key={data.number}
                sx={{
                  '&:hover': {
                    '& .number-chip': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    className="number-chip"
                    label={data.number}
                    color={chipColor}
                    sx={{
                      width: 48,
                      height: 48,
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography variant="body2" fontWeight="600">
                        Xuất hiện {data.count} lần
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {data.percentage}%
                      </Typography>
                    </Stack>

                    <Box sx={{ position: 'relative' }}>
                      <LinearProgress
                        variant="determinate"
                        value={(data.count / maxCount) * 100}
                        sx={{
                          height: 12,
                          borderRadius: 1,
                          backgroundColor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
                            borderRadius: 1,
                          },
                        }}
                      />
                    </Box>

                    {data.lastAppeared && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        Lần cuối: {formatDate(data.lastAppeared)}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* Legend */}
      <Paper variant="outlined" sx={{ p: 2, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="body2" fontWeight="600" gutterBottom>
          Chú thích màu sắc:
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {[
            { color: 'linear-gradient(90deg, #f44336, #ff9800)', label: 'Rất cao (80-100%)' },
            { color: 'linear-gradient(90deg, #ff9800, #ffeb3b)', label: 'Cao (60-80%)' },
            { color: 'linear-gradient(90deg, #ffeb3b, #4caf50)', label: 'Trung bình (40-60%)' },
            { color: 'linear-gradient(90deg, #4caf50, #2196f3)', label: 'Thấp (20-40%)' },
            { color: 'linear-gradient(90deg, #2196f3, #3f51b5)', label: 'Rất thấp (0-20%)' },
          ].map((item, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  background: item.color,
                  borderRadius: 0.5,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Paper>
  );
}

export default FrequencyAnalysis;
