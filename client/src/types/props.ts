import type { SearchResultDocument } from './api';
import type { BookDocument, FacetValue, Filter } from './models';

export interface SearchBarProps {
  postSearchHandler: (query: string) => void;
  query?: string;
  width?: string | number;
}

export interface ResultsProps {
  query: string;
  documents: SearchResultDocument[];
  count: number;
  skip: number;
  top: number;
}

export interface ResultProps {
  document: BookDocument;
}

export interface PagerProps {
  currentPage: number;
  resultCount: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface FacetsProps {
  facets: Record<string, FacetValue[]>;
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
}

export interface CheckboxFacetProps {
  name: string;
  values: FacetValue[];
  selectedFacets: Filter[];
  addFilter: (name: string, value: string) => void;
  removeFilter: (filter: Filter) => void;
  mapFacetName: (name: string) => string;
}
