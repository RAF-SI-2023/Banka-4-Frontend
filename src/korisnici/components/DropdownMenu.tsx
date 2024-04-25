import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownMenuProps {
  selected: string;
  onSelect: (selection: string) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ selected, onSelect }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSelect(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <Select
        id='dropdownMenuPlacanja'
        value={selected}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem id='dropdownMenuPlacanja1' value="novoPlacanje">Novo plaćanje</MenuItem>
        <MenuItem id='dropdownMenuPlacanja2' value="prenos">Prenos</MenuItem>
        <MenuItem id='dropdownMenuPlacanja3' value="primaociPlacanja">Primaoci plaćanja</MenuItem>
        <MenuItem id='dropdownMenuPlacanja4' value="pregledPlacanja">Pregled plaćanja</MenuItem>
      </Select>
    </FormControl>
  );
};
