import type { BookDocument, FacetValue, Filter } from './models';

export interface SearchResultDocument {
  score?: number;
  document: BookDocument;
}

export interface SearchRequest {
  q: string;
  top: number;
  skip: number;
  filters: Filter[];
}

export interface SuggestRequest {
  q: string;
  top: number;
  suggester: string;
}

export interface SearchResponse {
  count: number;
  facets: Record<string, FacetValue[]>;
  results: SearchResultDocument[];
}

export interface SuggestResponse {
  suggestions: Array<{
    text: string;
    [key: string]: unknown;
  }>;
}

export interface LookupResponse {
  document: BookDocument;
}
