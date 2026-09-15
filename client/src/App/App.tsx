import { lazy, Suspense, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppFooter from '../components/AppFooter';
import AppHeader from '../components/AppHeader';
import { AuthContext, type AuthUser } from '../contexts/AuthContext';
import { AppContainer } from './styled';

const Home = lazy(() => import('../pages/Home/Home'));
const Search = lazy(() => import('../pages/Search/Search'));
const Details = lazy(() => import('../pages/Details/Details'));

export default function App() {
  const [user, setUser] = useState<AuthUser>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch('/.auth/me', { signal: controller.signal })
      .then(async response => {
        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
          setUser(await response.json() as AuthUser);
        }
      })
      .catch(error => {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Authentication error:', error);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <AppContainer>
        <AppHeader />
        <BrowserRouter>
          <Suspense
            fallback={
              <Box
                component="main"
                aria-live="polite"
                sx={{ minHeight: '50vh', display: 'grid', placeItems: 'center' }}
              >
                <CircularProgress aria-label="Loading page" />
              </Box>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <AppFooter />
      </AppContainer>
    </AuthContext.Provider>
  );
}
