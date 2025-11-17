import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VietlottForm from './components/VietlottForm';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VietlottForm />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
