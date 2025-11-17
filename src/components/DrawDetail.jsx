import {
  Paper,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Alert,
  Stack,
} from '@mui/material';
import { formatDateLong, formatCurrency } from '../utils/mockData';

function DrawDetail({ draw }) {
  if (!draw) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%' }}>
        <Typography color="text.secondary">
          Chọn một kỳ để xem chi tiết
        </Typography>
      </Paper>
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
    <Paper elevation={3} sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Chi tiết kỳ quay
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="600">
          {lotteryName} - Kỳ #{draw.drawNumber}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {formatDateLong(draw.date)}
        </Typography>
      </Box>

      {/* Winning Numbers */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
          Các số trúng thưởng
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
          {draw.numbers.map((number, index) => (
            <Chip
              key={index}
              label={number}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                width: 64,
                height: 64,
                borderRadius: '50%',
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Statistics Summary */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'warning.50', borderColor: 'warning.main' }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Tổng số người trúng
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="warning.main" align="center">
              {formatCurrency(totalWinners)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.50', borderColor: 'success.main' }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Tổng tiền thưởng
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="success.main" align="center">
              {formatCurrency(draw.totalPrize)} VNĐ
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'secondary.50', borderColor: 'secondary.main' }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Jackpot
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="secondary.main" align="center">
              {formatCurrency(draw.jackpot)} VNĐ
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Prize Breakdown Table */}
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Chi tiết giải thưởng
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell><strong>Loại giải</strong></TableCell>
                <TableCell align="right"><strong>Giá trị/người</strong></TableCell>
                <TableCell align="right"><strong>Số người trúng</strong></TableCell>
                <TableCell align="right"><strong>Tổng tiền</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prizeStructure.map((prize, index) => (
                <TableRow
                  key={index}
                  sx={{
                    bgcolor: prize.winners > 0 ? 'success.50' : 'inherit',
                    '&:hover': { bgcolor: 'grey.50' },
                  }}
                >
                  <TableCell>
                    <Typography fontWeight="600">
                      {prize.name}
                      {prize.winners > 0 && index === 0 && ' 🎉'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="primary.main" fontWeight="600">
                      {prize.unitPrize} VNĐ
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold">
                      {formatCurrency(prize.winners)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="success.main" fontWeight="bold">
                      {formatCurrency(prize.total)} VNĐ
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell colSpan={2}><strong>Tổng cộng</strong></TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold">
                    {formatCurrency(totalWinners)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="primary.main" fontWeight="bold">
                    {formatCurrency(draw.totalPrize)} VNĐ
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Special Notice */}
      {draw.winners.jackpot > 0 && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography fontWeight="bold">
            🎊 Kỳ này có {draw.winners.jackpot} người trúng Jackpot với tổng giá trị{' '}
            {formatCurrency(draw.winners.jackpot * draw.jackpot)} VNĐ!
          </Typography>
        </Alert>
      )}
    </Paper>
  );
}

export default DrawDetail;
