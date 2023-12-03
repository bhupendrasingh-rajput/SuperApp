import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './Pages/RegistrationPage';
import CategoryPage from './Pages/CategoryPage';
import HomePage from './Pages/HomePage';
import EntertainmentPage from './Pages/EntertainmentPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<RegistrationPage />} />
        <Route path='/categories' element={<CategoryPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/entertainment' element={<EntertainmentPage />} />
      </Routes>
    </div>
  );
}

export default App;
