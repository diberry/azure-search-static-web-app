import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function AppFooter() {
  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" textAlign="center">
          &copy; {new Date().getFullYear()} Microsoft
        </Typography>
      </Container>
    </Box>
  );
}
