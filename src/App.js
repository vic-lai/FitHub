import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ProgramList from './components/Pages/ProgramList';
import Navbar from './components/Assets/Navbar';
import Program from './components/Pages/Program';
import { createTheme, ThemeProvider, } from '@mui/material';
import './App.css'
import { useEffect, useState } from 'react';
import CreateProgram from './components/Pages/CreateProgram';
import Contact from './components/Pages/Contact';
import Signup from './components/Pages/Signup';
import Login from './components/Pages/Login';
import Home from './components/Pages/Home';

const theme = createTheme({
  typography: {
    fontFamily: "Varela Round",
    
    h1: {
      color:"black"
    },
  },
  components: {
    MuiTextField: {
      styleOverRides: {
        root: {
          fontFamily:'Varela Round'
        }
      }
    }
  }
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<ProgramList />} />
            <Route path="/program/:title" element={<Program loggedIn={loggedIn} />} />
            <Route path="/create-program" element={<CreateProgram />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login onLoginSuccess={() => setLoggedIn(true) } />} />
            <Route path="/signup" element={<Signup onSignupSuccess={() => setLoggedIn(true) } />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
