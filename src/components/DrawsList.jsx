import {
  Paper,
  Typography,
  Box,
  List,
  ListItemButton,
  Chip,
  Stack,
} from '@mui/material';
import { formatDate, formatCurrency } from '../utils/mockData';

function DrawsList({ draws, onSelectDraw, selectedDrawId }) {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        100 kỳ quay gần nhất
      </Typography>

      <Box sx={{ maxHeight: 600, overflow: 'auto', mt: 2 }}>
        <List>
          {draws.map((draw) => (
            <ListItemButton
              key={draw.id}
              onClick={() => onSelectDraw(draw)}
              selected={selectedDrawId === draw.id}
              sx={{
                mb: 1,
                border: 1,
                borderColor: selectedDrawId === draw.id ? 'primary.main' : 'divider',
                borderRadius: 2,
                bgcolor: selectedDrawId === draw.id ? 'primary.50' : 'background.paper',
                '&:hover': {
                  borderColor: 'primary.light',
                },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box>
                    <Typography fontWeight="bold">
                      Kỳ #{draw.drawNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(draw.date)}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                      Jackpot
                    </Typography>
                    <Typography variant="body2" color="warning.main" fontWeight="bold">
                      {formatCurrency(draw.jackpot)} VNĐ
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                  {draw.numbers.map((num, idx) => (
                    <Chip
                      key={idx}
                      label={num}
                      size="small"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontWeight: 'bold',
                        minWidth: 32,
                      }}
                    />
                  ))}
                </Stack>

                {draw.winners.jackpot > 0 && (
                  <Typography
                    variant="caption"
                    color="success.main"
                    fontWeight="bold"
                    sx={{ mt: 1, display: 'block' }}
                  >
                    🎉 Có {draw.winners.jackpot} người trúng Jackpot!
                  </Typography>
                )}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Paper>
  );
}

export default DrawsList;
