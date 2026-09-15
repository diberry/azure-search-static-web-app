import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import type { LookupResponse } from '../../types/api';
import type { BookDocument } from '../../types/models';
import fetchInstance from '../../url-fetch';

const DetailsMain = styled('main')(({ theme }) => ({
  width: '100%',
  minWidth: 0,
  minHeight: theme.spacing(80),
  padding: theme.spacing(3, 2),
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(18.75),
    paddingRight: theme.spacing(18.75),
  },
}));

const TabPanel = styled('div')(({ theme }) => ({
  width: '100%',
  minWidth: 0,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `${theme.spacing(0.125)} solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
}));

const DetailCard = styled('div')(({ theme }) => ({
  width: '100%',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const CoverImage = styled('img')(({ theme }) => ({
  width: theme.spacing(20),
  maxWidth: '100%',
  height: 'auto',
  marginBottom: theme.spacing(2),
}));

const RawData = styled('div')({
  width: '100%',
  minWidth: 0,
  textAlign: 'left',
  '& pre': {
    width: '100%',
    maxWidth: '100%',
    overflowX: 'auto',
    whiteSpace: 'pre',
  },
});

interface CustomTabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

function CustomTabPanel({ children, value, index }: CustomTabPanelProps) {
  return (
    <TabPanel
      role="tabpanel"
      hidden={value !== index}
      id={`book-tabpanel-${index}`}
      aria-labelledby={`book-tab-${index}`}
    >
      {value === index && children}
    </TabPanel>
  );
}

export default function Details() {
  const { id } = useParams();
  const [document, setDocument] = useState<BookDocument>();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) {
      setError('A book identifier is required.');
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(undefined);
    fetchInstance<LookupResponse>('/api/lookup', {
      query: { id },
      signal: controller.signal,
    })
      .then(response => {
        setDocument(response.document);
        setIsLoading(false);
      })
      .catch(requestError => {
        if (requestError instanceof Error && requestError.name !== 'AbortError') {
          console.error('Lookup error:', requestError);
          setError('Unable to load book details.');
          setIsLoading(false);
        }
      });
    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <DetailsMain aria-live="polite">
        <Box sx={{ display: 'grid', placeItems: 'center', py: 4 }}>
          <CircularProgress aria-label="Loading book details" />
          <Typography sx={{ mt: 2 }}>Loading...</Typography>
        </Box>
      </DetailsMain>
    );
  }

  if (error || !document) {
    return (
      <DetailsMain>
        <Alert severity="error">{error || 'Unable to load book details.'}</Alert>
      </DetailsMain>
    );
  }

  const title = document.original_title || document.title || '<NO TITLE>';
  return (
    <DetailsMain>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={(_, value: number) => setActiveTab(value)}
          aria-label="Book details"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="Result" id="book-tab-0" aria-controls="book-tabpanel-0" />
          <Tab label="Raw Data" id="book-tab-1" aria-controls="book-tabpanel-1" />
        </Tabs>
      </Box>
      <CustomTabPanel value={activeTab} index={0}>
        <DetailCard>
          <Typography variant="h5" component="h1" textAlign="center" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <CoverImage src={document.image_url} alt="Book cover" />
          <Typography>{document.authors?.join('; ')} - {document.original_publication_year}</Typography>
          <Typography>ISBN {document.isbn}</Typography>
          <Rating
            name="book-rating"
            value={document.average_rating ? Number(document.average_rating) : 0}
            precision={0.1}
            readOnly
          />
          <Typography>{document.ratings_count} Ratings</Typography>
        </DetailCard>
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        <RawData>
          <pre><code>{JSON.stringify(document, null, 2)}</code></pre>
        </RawData>
      </CustomTabPanel>
    </DetailsMain>
  );
}
