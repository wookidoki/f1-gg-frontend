import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import GlobalStyle from './styles/GlobalStyle'
import { lightTheme, darkTheme } from './styles/theme'

function App() {
  const [count, setCount] = useState(0)

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    /*
    let prev = isDarkMode;

    let newValue;

    if(prev === true){
      newValue = false;
    } else {
      newValue = true;
      }

    setIsDarkMode(newValue)
    */
  };

  return (
    <>
      <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
        <GlobalStyle>
          <BrowserRouter>

          </BrowserRouter>
        </GlobalStyle>
      </ThemeProvider>
    </>
  )
}

export default App
