import SelectionTab from "../../../components/SelectionTab";
import React, { useState } from "react";
import ClassroomProjects from "./ClassroomProjects";
import PersonalisedProjects from "./PersonalisedProjects";
import PracticeProjects from "./PracticeProjects";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

function ProjectReview() {
  const tabs = [
    "Classroom Projects",
    "Personalised Projects",
    "Practice Projects",
  ];
  const [selectedTab, setSelectedTab] = useState("Classroom Projects");
  const [selectedRadio, setRadio] = useState("Review Projects");
  const [gradeDropdown, setGradeDropdown] = useState("All");
  const [divisionDropdown, setDivisionDropdown] = useState("All");
  const [pageSize, setPageSize] = useState();

  const handleGradeChange = (value) => {
    setGradeDropdown(value.target.value);
  };

  const handleDivisionChange = (value) => {
    setDivisionDropdown(value.target.value);
  };
  return (
    <div>
      <div className="text-xl font-bold mt-5">My Projects</div>
      <SelectionTab
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
        tabs={tabs}
      />
      <div className="mt-5">
        <div className="gap-5 flex">
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Select Faculty
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gradeDropdown}
              label="Select Faculty"
              onChange={handleGradeChange}
              className="w-60"
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"some name"}>some name</MenuItem>
              <MenuItem value={"some name 2"}>some name 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Select Division
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={divisionDropdown}
              label="Select Faculty"
              onChange={handleDivisionChange}
              className="w-60"
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"some name"}>some name</MenuItem>
              <MenuItem value={"some name 2"}>some name 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                checked={selectedRadio == "Review Projects" ? true : false}
                onClick={() => setRadio("Review Projects")}
                control={<Radio />}
                label="Faculty"
              />
              <FormControlLabel
                checked={selectedRadio == "Approved Projects" ? true : false}
                onClick={() => setRadio("Approved Projects")}
                control={<Radio />}
                label="Grade"
              />
              <FormControlLabel
                checked={selectedRadio == "Pending Projects" ? true : false}
                onClick={() => setRadio("Pending Projects")}
                control={<Radio />}
                label="Pending Projects"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Page Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageSize}
              label="Select Faculty"
              onChange={handleDivisionChange}
              className="w-60"
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"some name"}>some name</MenuItem>
              <MenuItem value={"some name 2"}>some name 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <table className="min-w-full border-collapse border border-gray-200 mt-5">
          <thead className="bg-custom-orange-dark rounded-md">
            <tr>
              <th className="p-2 text-left">Student Name</th>
              <th className="p-2 text-left">Division</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectReview;
