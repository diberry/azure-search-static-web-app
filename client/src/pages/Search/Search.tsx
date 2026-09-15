import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Facets from '../../components/Facets/Facets';
import Pager from '../../components/Pager';
import Results from '../../components/Results/Results';
import SearchBar from '../../components/SearchBar/SearchBar';
import type { SearchRequest, SearchResponse, SearchResultDocument } from '../../types/api';
import type { FacetValue, Filter } from '../../types/models';
import fetchInstance from '../../url-fetch';

const SearchMain = styled('main')(({ theme }) => ({
  minWidth: 0,
  padding: theme.spacing(2),
}));

const SearchLayout = styled('div')(({ theme }) => ({
  minWidth: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: `minmax(${theme.spacing(32)}, 1fr) minmax(0, 3fr)`,
  },
}));

const SearchSidebar = styled('aside')(({ theme }) => ({
  minWidth: 0,
  [theme.breakpoints.up('md')]: {
    borderRight: `${theme.spacing(0.125)} solid ${theme.palette.divider}`,
    paddingRight: theme.spacing(2),
  },
}));

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const urlQuery = new URLSearchParams(location.search).get('q') || '*';
  const [results, setResults] = useState<SearchResultDocument[]>([]);
  const [resultCount, setResultCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [top] = useState(Number(new URLSearchParams(location.search).get('top')) || 8);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [facets, setFacets] = useState<Record<string, FacetValue[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const lastRequestKey = useRef<string | undefined>(undefined);
  const skip = (currentPage - 1) * top;

  useEffect(() => {
    const body: SearchRequest = { q: urlQuery, top, skip, filters };
    const requestKey = JSON.stringify(body);
    if (lastRequestKey.current === requestKey) {
      return undefined;
    }
    lastRequestKey.current = requestKey;

    const controller = new AbortController();
    setIsLoading(true);
    fetchInstance<SearchResponse>('/api/search', {
      body,
      method: 'POST',
      signal: controller.signal,
    })
      .then(response => {
        setResults(response.results);
        setFacets(response.facets);
        setResultCount(response.count);
        setIsLoading(false);
      })
      .catch(error => {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Search error:', error);
          setResults([]);
          setFacets({});
          setResultCount(0);
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [filters, skip, top, urlQuery]);

  const submitSearch = (searchTerm: string) => {
    const nextQuery = searchTerm.trim() || '*';
    setCurrentPage(1);
    setFilters([]);
    navigate(`/search?q=${encodeURIComponent(nextQuery)}`);
  };

  const updateFilters = (nextFilters: Filter[]) => {
    setCurrentPage(1);
    setFilters(nextFilters);
  };

  return (
    <SearchMain>
      <SearchLayout>
        <SearchSidebar>
          <SearchBar postSearchHandler={submitSearch} query={urlQuery} width="100%" />
          <Facets facets={facets} filters={filters} setFilters={updateFilters} />
        </SearchSidebar>
        <Box sx={{ minWidth: 0 }}>
          {isLoading ? (
            <Box aria-live="polite" sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress aria-label="Loading search results" />
            </Box>
          ) : (
            <>
              <Results
                documents={results}
                top={top}
                skip={skip}
                count={resultCount}
                query={urlQuery}
              />
              <Pager
                currentPage={currentPage}
                resultCount={resultCount}
                resultsPerPage={top}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </SearchLayout>
    </SearchMain>
  );
}
