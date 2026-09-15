import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CheckboxFacet from './CheckboxFacet/CheckboxFacet';
import type { Filter } from '../../types/models';
import type { FacetsProps } from '../../types/props';

function mapFacetName(facetName: string): string {
  const trimmedName = facetName.trim().replace('_', ' ');
  return trimmedName ? `${trimmedName[0].toUpperCase()}${trimmedName.slice(1)}` : '';
}

export default function Facets({ facets, filters, setFilters }: FacetsProps) {
  const addFilter = (name: string, value: string) => {
    setFilters(filters.concat({ field: name, value }));
  };
  const removeFilter = (filter: Filter) => {
    setFilters(filters.filter(
      item => item.field !== filter.field || item.value !== filter.value,
    ));
  };

  return (
    <div>
      <List component="ul" disablePadding sx={{ display: 'flex', flexWrap: 'wrap', py: 1 }}>
        {filters.map(filter => (
          <ListItem key={`${filter.field}:${filter.value}`} disablePadding sx={{ width: 'auto', m: 0.5 }}>
            <Chip
              label={`${mapFacetName(filter.field)}: ${filter.value}`}
              onDelete={() => removeFilter(filter)}
              onClick={() => removeFilter(filter)}
              aria-label={`Remove ${mapFacetName(filter.field)}: ${filter.value} filter`}
            />
          </ListItem>
        ))}
      </List>
      <List component="nav" aria-label="Search facets">
        {Object.entries(facets).map(([name, values]) => (
          <CheckboxFacet
            key={name}
            name={name}
            values={values}
            addFilter={addFilter}
            removeFilter={removeFilter}
            mapFacetName={mapFacetName}
            selectedFacets={filters.filter(filter => filter.field === name)}
          />
        ))}
      </List>
    </div>
  );
}
