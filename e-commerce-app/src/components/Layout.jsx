import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>displaying the content</main>
      <footer></footer>
    </ThemeProvider>
  );
}
