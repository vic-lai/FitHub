import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Assets/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
