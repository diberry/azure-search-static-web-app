import { styled } from '@mui/material/styles';
import type { ResultProps } from '../../../types/props';

const ResultCard = styled('a')(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(27.5),
  padding: theme.spacing(1),
  margin: theme.spacing(1.25),
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  textAlign: 'center',
  textDecoration: 'none',
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.background.paper,
  border: `${theme.spacing(0.125)} solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create('background-color'),
  '&:hover, &:active': {
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.action.hover,
  },
}));

const ResultImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: theme.spacing(18.75),
  objectFit: 'contain',
  display: 'block',
  backgroundColor: theme.palette.background.default,
}));

const ResultTitle = styled('span')(({ theme }) => ({
  minHeight: theme.spacing(5.25),
  padding: theme.spacing(0, 1),
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: theme.typography.pxToRem(14),
  lineHeight: 1.4,
}));

export default function Result({ document }: ResultProps) {
  const title = document.original_title || document.title || '<NO TITLE>';

  return (
    <ResultCard href={`/details/${document.id}`} aria-label={`View details for ${title}`}>
      <ResultImage src={document.image_url} alt="" />
      <span style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
        <ResultTitle>{title}</ResultTitle>
      </span>
    </ResultCard>
  );
}
