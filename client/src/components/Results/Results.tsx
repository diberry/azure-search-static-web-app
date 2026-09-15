import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Result from './Result/Result';
import type { ResultsProps } from '../../types/props';

const ResultsGrid = styled('div')({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  width: '100%',
});

export default function Results({
  documents,
  top,
  skip,
  count,
  query,
}: ResultsProps) {
  const beginDocument = Math.min(skip + 1, count);
  const endDocument = Math.min(skip + top, count);

  return (
    <Box>
      <Typography sx={{ m: 2 }}>
        Showing {beginDocument}-{endDocument} of {count.toLocaleString()} results for{' '}
        <strong>{query}</strong>
      </Typography>
      <ResultsGrid>
        {documents.map(result => (
          <Result key={result.document.id} document={result.document} />
        ))}
      </ResultsGrid>
    </Box>
  );
}
