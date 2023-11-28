import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './Pages/RegistrationPage';
function App() {
  return (
    <div className="App">
      {/* <RegistrationPage/> */}
      <Routes>
        <Route path='/' element={<RegistrationPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
