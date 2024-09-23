import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Assets/Navbar';
import Program from './components/Home/Program';
import { createTheme, ThemeProvider, } from '@mui/material';
import './App.css'
import { useEffect, useState } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: "Oswald",
    allVariants: {
      color:"white"
    },
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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
