import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Market from './market/Market';
import Graphs from './graphs/Graphs';


function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/market' element={<Market/>}/>
        <Route path='/graphs' element={<Graphs/>}/>
      </Routes>
  );
}

export default App;
