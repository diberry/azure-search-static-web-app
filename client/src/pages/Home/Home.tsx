import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import logo from '../../images/cognitive_search.jpg';

const HomeMain = styled('main')(({ theme }) => ({
  width: '100%',
  minHeight: theme.spacing(80),
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

const HomeContent = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: theme.spacing(100),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Logo = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.spacing(50),
  height: 'auto',
  objectFit: 'contain',
}));

export default function Home() {
  const navigate = useNavigate();

  return (
    <HomeMain>
      <HomeContent>
        <Logo src={logo} alt="Cognitive Search" loading="eager" />
        <Typography variant="h6" component="p" sx={{ mb: 2, textAlign: 'center' }}>
          Powered by Azure AI Search
        </Typography>
        <Box sx={{ width: '100%', px: { xs: 0, sm: 2 } }}>
          <SearchBar
            postSearchHandler={query =>
              navigate(`/search?q=${encodeURIComponent(query.trim() || '*')}`)}
            width="100%"
          />
        </Box>
      </HomeContent>
    </HomeMain>
  );
}
