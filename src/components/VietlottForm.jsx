import { useState } from 'react';
import './VietlottForm.css';

function VietlottForm() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLottery, setSelectedLottery] = useState('655');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ngày:', selectedDate);
    console.log('Loại giải:', selectedLottery);
    // Xử lý logic kiểm tra kết quả ở đây
    alert(`Kiểm tra kết quả:\nNgày: ${selectedDate}\nLoại giải: ${selectedLottery === '655' ? 'Mega 6/55' : 'Power 6/45'}`);
  };

  const handleReset = () => {
    setSelectedDate('');
    setSelectedLottery('655');
  };

  return (
    <div className="vietlott-form-container">
      <h1 className="form-title">Kiểm tra kết quả Vietlott</h1>

      <form onSubmit={handleSubmit} className="vietlott-form">
        <div className="form-group">
          <label htmlFor="date-input" className="form-label">
            Chọn ngày quay thưởng:
          </label>
          <input
            type="date"
            id="date-input"
            className="date-input"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Chọn loại giải:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="lottery-655"
                name="lottery"
                value="655"
                checked={selectedLottery === '655'}
                onChange={(e) => setSelectedLottery(e.target.value)}
              />
              <label htmlFor="lottery-655" className="radio-label">
                <span className="radio-custom"></span>
                Mega 6/55
              </label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                id="lottery-645"
                name="lottery"
                value="645"
                checked={selectedLottery === '645'}
                onChange={(e) => setSelectedLottery(e.target.value)}
              />
              <label htmlFor="lottery-645" className="radio-label">
                <span className="radio-custom"></span>
                Power 6/45
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Kiểm tra kết quả
          </button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            Làm mới
          </button>
        </div>
      </form>
    </div>
  );
}

export default VietlottForm;
