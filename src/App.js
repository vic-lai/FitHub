import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Pages/Home';
import Navbar from './components/Assets/Navbar';
import Program from './components/Pages/Program';
import { createTheme, ThemeProvider, } from '@mui/material';
import './App.css'
import { useEffect, useState } from 'react';
import CreateProgram from './components/Pages/CreateProgram';

const theme = createTheme({
  typography: {
    fontFamily: "Oswald",
    
    h1: {
      color:"black"
    },
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/program/:title" element={<Program />} />
            <Route path="/create-program" element={<CreateProgram />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
