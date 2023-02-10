import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/theme.js';
import { Main } from './pages/Main.js'
import * as React from 'react';
import { SnackbarProvider } from 'notistack';

export default function App() {
  return (
    <SnackbarProvider autoHideDuration={3000} maxSnack={3}>
      <ThemeProvider theme={theme}>
        <div style={{ margin: "0 20px" }} className="App">
          <Main></Main>
        </div>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

