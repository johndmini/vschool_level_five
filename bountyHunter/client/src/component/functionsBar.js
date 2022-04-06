import React from 'react';
import { Box, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

export default function FunctionsBar(props) {
  return (
    <Box sx={{ display: 'inline-block', width: '150px', mt: '20px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter By Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.filterItems}
          label="Age"
          onChange={props.handlefilter}
        >
          <MenuItem value="reset">List All</MenuItem>
          <MenuItem value="jedi">Jedi</MenuItem>
          <MenuItem value="sith">Sith</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
