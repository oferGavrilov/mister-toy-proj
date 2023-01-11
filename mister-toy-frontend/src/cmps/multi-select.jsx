import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { toyService } from '../services/toy.service';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 20,
//     },
//   },
// };

const labels = toyService.getLabels()

export function MultiSelect({ onSetLabels }) {
  const [type, setType] = useState([]);

  useEffect(() => {
    onSetLabels(type)
  }, [type])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setType(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div >
      <FormControl className='labels-pick'>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={type}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          // MenuProps={MenuProps}
        >
          {labels.map((label) => (
            <MenuItem key={label} value={label}>
              <Checkbox checked={type.indexOf(label) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}