import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useState } from "react";

function AssignProject() {
  const [selectedRadio, setRadio] = useState("Classroom Project");
  const [dropdown, setDropdown] = useState("All");
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleChange = (value) => {
    setDropdown(value.target.value);
  };
  return (
    <div>
      <div className="mt-5 flex">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              checked={selectedRadio == "Classroom Project" ? true : false}
              onClick={() => setRadio("Classroom Project")}
              control={<Radio />}
              label="Classroom Project"
            />
            <FormControlLabel
              checked={selectedRadio == "Personalised Project" ? true : false}
              onClick={() => setRadio("Personalised Project")}
              control={<Radio />}
              label="Personalised Project"
            />
          </RadioGroup>

          <InputLabel id="demo-simple-select-label">Grade</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dropdown}
            label="Grade"
            onChange={handleChange}
            className="w-40"
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"some name"}>some name</MenuItem>
            <MenuItem value={"some name 2"}>some name 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Division</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dropdown}
            label="Division"
            onChange={handleChange}
            className="w-40"
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"some name"}>some name</MenuItem>
            <MenuItem value={"some name 2"}>some name 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Module</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dropdown}
            label="Module"
            onChange={handleChange}
            className="w-40"
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"some name"}>some name</MenuItem>
            <MenuItem value={"some name 2"}>some name 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Tool</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dropdown}
            label="Tool"
            onChange={handleChange}
            className="w-40"
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"some name"}>some name</MenuItem>
            <MenuItem value={"some name 2"}>some name 2</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div
        className={`grid ${
          windowDimensions.width > 820 ? "grid-cols-[50%_50%]" : "grid-cols-1"
        } gap-x-4 mt-5`}
      >
        <div className="shadow-lg rounded-lg pb-5">
          <div className="flex bg-custom-orange-light rounded-t-lg p-3 items-center">
            <div className="font-bold text-xl">Overview of the project</div>
            <div className="ml-auto border-2 border-black rounded-md py-1 px-2 text-sm font-bold">
              View
            </div>
          </div>
        </div>
        <div className="shadow-lg rounded-lg pb-5">
          <div className="flex bg-custom-orange-light rounded-t-lg p-3 items-center">
            <div className="font-bold text-xl">Assigned Project</div>
           
          </div>
        </div>
      </div>
      <div className="flex gap-5 mt-5 justify-center">
      <div
          className="p-2 border-2 rounded-md items-center justify-center mt-2 border-custom-blue hover:cursor-pointer"
          onClick={() => null}
        >
          <div className="font-bold text-xs ">Reset</div>
        </div>
        <div
          className="p-2 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer"
          onClick={() => null}
        >
          <div className="font-bold text-xs ">Submit</div>
        </div>
      </div>
    </div>
  );
}

export default AssignProject;
