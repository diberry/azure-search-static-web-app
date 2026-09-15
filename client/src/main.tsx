import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';
import App from './App/App';
import theme, { globalStyles } from './theme';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found.");
}

createRoot(rootElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles styles={globalStyles} />
    <App />
  </ThemeProvider>,
);
