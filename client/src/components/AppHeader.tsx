import { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import AppHeaderAuth from './AppHeaderAuth';
import logo from '../images/microsoft_small.png';

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleButton = useRef<HTMLButtonElement>(null);

  return (
    <AppBar
      component="header"
      position="static"
      color="secondary"
      onKeyDown={event => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false);
          toggleButton.current?.focus();
        }
      }}
      sx={{ color: 'secondary.contrastText', position: 'relative' }}
    >
      <Toolbar component="nav" aria-label="Primary navigation">
        <Box
          component="a"
          href="/"
          aria-label="Microsoft home"
          sx={{ display: 'flex', alignItems: 'center', mr: 2 }}
        >
          <Box
            component="img"
            src={logo}
            alt=""
            sx={{ height: theme => theme.spacing(3), aspectRatio: 1, objectFit: 'contain' }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}
        >
          <Button href="/search" color="inherit" sx={{ textTransform: 'none' }}>
            Search
          </Button>
          <Button
            href="https://azure.microsoft.com/services/search/"
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            Learn more
          </Button>
        </Stack>

        <Box sx={{ display: { xs: 'block', sm: 'none' }, flexGrow: 1 }}>
          <IconButton
            ref={toggleButton}
            color="inherit"
            aria-label="Toggle navigation"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            id="mobile-navigation"
            hidden={!menuOpen}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: theme => theme.zIndex.appBar,
              bgcolor: 'secondary.main',
              px: 2,
              pb: 2,
            }}
          >
            <Stack alignItems="flex-start">
              <Button
                href="/search"
                color="inherit"
                onClick={() => setMenuOpen(false)}
                sx={{ textTransform: 'none' }}
              >
                Search
              </Button>
              <Button
                href="https://azure.microsoft.com/services/search/"
                color="inherit"
                onClick={() => setMenuOpen(false)}
                sx={{ textTransform: 'none' }}
              >
                Learn more
              </Button>
            </Stack>
          </Box>
        </Box>

        <AppHeaderAuth />
      </Toolbar>
    </AppBar>
  );
}
