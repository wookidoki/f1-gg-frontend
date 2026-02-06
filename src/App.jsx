import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { lightTheme, darkTheme } from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer/footer';
import Home from './pages/Home/Home';
import Schedule from './pages/Schedule/Schedule';
import Driver from './pages/Driver/Driver';
import DriverDetail from './pages/Driver/DriverDetail/DriverDetail';

import Teams from './pages/Team/Teams';
import TeamDetail from './pages/Team/TeamDetail/TeamDetail';

import Standings from './pages/Standing/Standing';
import RaceDetail from './pages/Standing/RaceDetail/RaceDEtail';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Favorites from './pages/Favorites/Favorites';
import Stats from './pages/Stats/Stats';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
          <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

          <div style={{ maxWidth: '1024px', margin: '2rem auto', padding: '0 1rem' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/drivers" element={<Driver/>} />
              <Route path="/drivers/:code" element={<DriverDetail/>} />

              <Route path="/team" element={<Teams/>} />
              <Route path="/teams/:id" element={<TeamDetail/>} />

              <Route path="/standings" element={<Standings />} />
              <Route path="/race/:id" element={<RaceDetail />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;