import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownMenuProps {
  onSelect: (selection: string) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ onSelect }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSelect(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <Select
        defaultValue=""
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="" disabled>
          Izaberite opciju
        </MenuItem>
        <MenuItem value="novoPlacanje">Novo plaćanje</MenuItem>
        <MenuItem value="prenos">Prenos</MenuItem>
        {/*<MenuItem value="primaociPlacanja">Primaoci plaćanja</MenuItem>*/}
        <MenuItem value="pregledPlacanja">Pregled plaćanja</MenuItem>
      </Select>
    </FormControl>
  );
};
