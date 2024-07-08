import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import RoutesPath from './routes';
import { DataProvider } from './utils/DataContext';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0c0a10",
    },
    secondary: {
      main: "#1b1724",
    },
    background: {
      main: "#131019",
    },
    customTextColor: {
      main: "#fa1e4e",
      secondary: "#e7edf1",
      faded: "#e7edf18c",
      hover: "#bf173c"
    },
  },
  typography: {
    fontFamily: 'OCR A Std, monospace',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <DataProvider>
      <React.StrictMode>
        <BrowserRouter>
          <RoutesPath />
        </BrowserRouter>
      </React.StrictMode>
    </DataProvider>
  </ThemeProvider>
);

reportWebVitals();
