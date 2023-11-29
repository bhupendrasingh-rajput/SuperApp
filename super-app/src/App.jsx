import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './Pages/RegistrationPage';
import CategoryPage from './Pages/CategoryPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      {/* <RegistrationPage/> */}
      <Routes>
        <Route path='/' element={<RegistrationPage />} />
        <Route path='/categories' element={<CategoryPage />} />
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
