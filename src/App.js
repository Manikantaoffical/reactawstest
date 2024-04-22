import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DashBoardComponent from './components/admincomponents/DashBoardComponent';
import LoginComponent from './components/admincomponents/LoginComponent';
import RegisterComponent from './components/admincomponents/RegisterComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/dashboard' element={<DashBoardComponent />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
