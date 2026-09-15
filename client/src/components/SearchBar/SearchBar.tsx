import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import fetchInstance from '../../url-fetch';
import type { SuggestRequest, SuggestResponse } from '../../types/api';
import type { SearchBarProps } from '../../types/props';

const SearchButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  minWidth: theme.spacing(10),
  flexShrink: 0,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));

export default function SearchBar({ postSearchHandler, query, width }: SearchBarProps) {
  const [q, setQ] = useState(query || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(false);

  const search = (value: string) => {
    setSuggestions([]);
    setSuggestionsEnabled(false);
    postSearchHandler(value);
  };

  useEffect(() => {
    setQ(query || '');
    setSuggestions([]);
    setSuggestionsEnabled(false);
  }, [query]);

  useEffect(() => {
    if (!q || !suggestionsEnabled) {
      setSuggestions([]);
      return undefined;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      const body: SuggestRequest = { q, top: 5, suggester: 'sg' };
      fetchInstance<SuggestResponse>('/api/suggest', {
        body,
        method: 'POST',
        signal: controller.signal,
      })
        .then(response => {
          setSuggestions(response.suggestions.map(suggestion => suggestion.text));
        })
        .catch(error => {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error(error);
            setSuggestions([]);
          }
        });
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [q, suggestionsEnabled]);

  return (
    <Box sx={{ width: width || 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Autocomplete
          freeSolo
          disableClearable
          inputValue={q}
          options={suggestions}
          open={suggestions.length > 0}
          onInputChange={(_, value, reason) => {
            setQ(value);
            setSuggestionsEnabled(reason === 'input');
          }}
          onChange={(_, value) => {
            const nextValue = value || '';
            setQ(nextValue);
            search(nextValue);
          }}
          sx={{ flex: 1, minWidth: 0 }}
          renderInput={params => (
            <TextField
              {...params}
              id="search-box"
              placeholder="What are you looking for?"
              onKeyDown={event => {
                if (event.key === 'Enter' && !event.defaultPrevented) {
                  search(q);
                }
              }}
            />
          )}
        />
        <SearchButton variant="contained" color="primary" onClick={() => search(q)}>
          Search
        </SearchButton>
      </Box>
    </Box>
  );
}
