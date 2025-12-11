import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { lightTheme, darkTheme } from './styles/theme';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home/Home';
import Schedule from './pages/Schedule/Schedule'; 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      
      <BrowserRouter>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <div style={{ maxWidth: '1024px', margin: '2rem auto', padding: '0 1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            
            <Route path="/standings" element={<h2>🏆 순위 화면 준비중...</h2>} />
            <Route path="/drivers" element={<h2>🏎️ 드라이버 화면 준비중...</h2>} />
            <Route path="/team" element={<h2>👥 팀 화면 준비중...</h2>} />
            <Route path="/stats" element={<h2>📊 통계 화면 준비중...</h2>} />
          </Routes>
        </div>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;