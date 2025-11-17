import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Stack,
} from '@mui/material';

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
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Kiểm tra kết quả Vietlott
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Date Input */}
              <FormControl fullWidth>
                <FormLabel sx={{ mb: 1, fontWeight: 600 }}>
                  Chọn ngày quay thưởng:
                </FormLabel>
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>

              {/* Lottery Type Selection */}
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
                  Chọn loại giải:
                </FormLabel>
                <RadioGroup
                  value={selectedLottery}
                  onChange={(e) => setSelectedLottery(e.target.value)}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      mb: 1,
                      cursor: 'pointer',
                      border: selectedLottery === '655' ? 2 : 1,
                      borderColor: selectedLottery === '655' ? 'primary.main' : 'divider',
                      bgcolor: selectedLottery === '655' ? 'primary.50' : 'transparent',
                      '&:hover': {
                        borderColor: 'primary.light',
                      },
                    }}
                  >
                    <FormControlLabel
                      value="655"
                      control={<Radio />}
                      label={
                        <Typography fontWeight={600}>Mega 6/55</Typography>
                      }
                    />
                  </Paper>

                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      border: selectedLottery === '645' ? 2 : 1,
                      borderColor: selectedLottery === '645' ? 'primary.main' : 'divider',
                      bgcolor: selectedLottery === '645' ? 'primary.50' : 'transparent',
                      '&:hover': {
                        borderColor: 'primary.light',
                      },
                    }}
                  >
                    <FormControlLabel
                      value="645"
                      control={<Radio />}
                      label={
                        <Typography fontWeight={600}>Power 6/45</Typography>
                      }
                    />
                  </Paper>
                </RadioGroup>
              </FormControl>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    boxShadow: 2,
                  }}
                >
                  Kiểm tra kết quả
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleReset}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Làm mới
                </Button>
              </Stack>
            </Stack>
          </form>

          {/* Info Note */}
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 3 }}
          >
            Kết quả xổ số chỉ mang tính chất tham khảo
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default VietlottForm;
