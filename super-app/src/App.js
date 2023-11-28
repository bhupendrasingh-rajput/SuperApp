import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './Pages/RegistrationPage';
import CategoryPage from './Pages/CategoryPage';

function App() {
  return (
    <div className="App">
      {/* <RegistrationPage/> */}
      <Routes>
        <Route path='/' element={<RegistrationPage />} />
        <Route path='/categories' element={<CategoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
