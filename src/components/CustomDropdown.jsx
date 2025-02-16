import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'



function CustomDropdown({label, dropdown, handleChange}) {

    const menu = {"All": "All", "Some Name": "Some Name", "Some Name 2": "Some Name 2"}
  return (
    <FormControl>
          <InputLabel id="demo-simple-select-label">Tool</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dropdown}
            label={label}
            onChange={handleChange}
            className="w-40"
          >
            {Object.keys(menu).map((item) => (
            <MenuItem value={item}>{menu[item]}</MenuItem>

            ))}
            
          </Select>
        </FormControl>
  )
}

export default CustomDropdown