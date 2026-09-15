import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import type { CheckboxFacetProps } from '../../../types/props';

export default function CheckboxFacet({
  name,
  values,
  selectedFacets,
  addFilter,
  removeFilter,
  mapFacetName,
}: CheckboxFacetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <ListItemButton
        onClick={() => setIsExpanded(expanded => !expanded)}
        aria-expanded={isExpanded}
        aria-controls={`${name}-facet-values`}
      >
        <ListItemText primary={mapFacetName(name)} />
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isExpanded} id={`${name}-facet-values`}>
        <List disablePadding>
          {values.map(facetValue => {
            const filter = { field: name, value: facetValue.value };
            const selected = selectedFacets.some(
              selectedFacet => selectedFacet.value === facetValue.value,
            );
            return (
              <ListItem key={facetValue.value} dense disableGutters>
                <FormControlLabel
                  sx={{ ml: 2 }}
                  control={
                    <Checkbox
                      checked={selected}
                      onChange={() => selected ? removeFilter(filter) : addFilter(name, facetValue.value)}
                    />
                  }
                  label={`${facetValue.value} (${facetValue.count})`}
                />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
}
