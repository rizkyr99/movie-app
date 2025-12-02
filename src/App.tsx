import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/movie/:movieId' element={<MovieDetailPage />} />
    </Routes>
  );
}

export default App;
