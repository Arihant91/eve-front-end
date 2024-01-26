import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Market from './market/Market';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/market' element={<Market/>}/>
    </Routes>
  );
}

export default App;
