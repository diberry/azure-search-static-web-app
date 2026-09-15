import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useAuth } from '../contexts/AuthContext';

export default function AppHeaderAuth() {
  const user = useAuth();
  const userDetails = user.clientPrincipal?.userDetails;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {userDetails && (
        <Typography variant="body2" color="inherit">
          {userDetails}
        </Typography>
      )}
      <Link
        href={userDetails ? '/logout' : '/login'}
        color="inherit"
        underline="always"
      >
        {userDetails ? 'Sign Out' : 'Sign In'}
      </Link>
    </Box>
  );
}
