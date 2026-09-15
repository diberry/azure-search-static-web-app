import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import type { PagerProps } from '../types/props';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    color: theme.palette.secondary.main,
  },
  '& .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

export default function Pager({
  currentPage,
  resultCount,
  resultsPerPage,
  onPageChange,
}: PagerProps) {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));
  const page = Math.max(1, Math.trunc(currentPage));
  const totalPages = Math.max(1, Math.ceil(resultCount / resultsPerPage));

  return (
    <Box component="nav" aria-label="Search results pagination" sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <StyledPagination
        page={page}
        count={totalPages}
        variant="outlined"
        shape="rounded"
        siblingCount={compact ? 0 : 2}
        boundaryCount={1}
        onChange={(_, nextPage) => onPageChange(nextPage)}
        getItemAriaLabel={(type, itemPage, selected) => {
          if (type === 'page') {
            return selected ? `Page ${itemPage}, current page` : `Go to page ${itemPage}`;
          }
          return `Go to ${type} page`;
        }}
      />
    </Box>
  );
}
