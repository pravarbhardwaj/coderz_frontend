import ScheduleCalendar from "../../components/ScheduleCalendar";
import React, { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Download, FolderPlus, FolderUp, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

const Schedule = () => {
  const [selectedTab, setSelectedTab] = useState("schedule");
  const [selectedRadio, setRadio] = useState("faculty");
  const [dropdown, setDropdown] = useState("All");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  const handleChange = (value) => {
    setDropdown(value.target.value);
  };

  const ScheduleTab = () => {
    return (
      <div className="mt-5">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              checked={selectedRadio == "faculty" ? true : false}
              onClick={() => setRadio("faculty")}
              control={<Radio />}
              label="Faculty"
            />
            <FormControlLabel
              checked={selectedRadio == "grade" ? true : false}
              onClick={() => setRadio("grade")}
              control={<Radio />}
              label="Grade"
            />
          </RadioGroup>
        </FormControl>

        <div className="mt-5 w-60">
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Select Faculty
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dropdown}
              label="Select Faculty"
              onChange={handleChange}
              className="w-60"
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"some name"}>some name</MenuItem>
              <MenuItem value={"some name 2"}>some name 2</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="mt-5">
          <ScheduleCalendar />
        </div>
      </div>
    );
  };

  const ScheduleUploadTab = () => {
    return (
      <div className="w-full">
        <div
          {...getRootProps()}
          className="mt-10 p-6 border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg flex-col cursor-pointer"
        >
          <div className="justify-center mt-8 flex">
            {" "}
            <input {...getInputProps()} ref={fileInputRef} />
            <p className="text-blue-400 text-lg">
              Drag And Drop File Here To Upload
            </p>
          </div>

          <button
            className="mt-4 px-4 py-2 border border-blue-400 text-blue-900 flex items-center rounded-md hover:bg-blue-100 transition"
            onClick={handleButtonClick}
          >
            <Upload className="mr-2" size={20} /> ADD FILES
          </button>
        </div>
        <div className="flex justify-center items-center mt-5">
          <div>
            <div> Max File Size 15 MB.</div>
            <div>File type accepted .csv</div>
          </div>
          <div className="ml-auto cursor-pointer bg-custom-lime p-2 rounded-md border-2 text-sm font-semibold flex gap-2">
            Download Format <Download size={18} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="cursor-pointer bg-custom-blue p-2 rounded-md border-2 text-sm font-semibold flex gap-2">
            <Upload size={18} />
            Upload
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="font-bold text-2xl mt-10">Schedule</div>
      <div className="flex mt-2">
        <div
          className={`rounded-t-md justify-center flex border-b-2 border-custom-blue ${
            selectedTab == "schedule"
              ? "bg-custom-orange-dark "
              : "bg-custom-blue"
          } px-2 py-1 hover:cursor-pointer content-center gap-2`}
          onClick={() => setSelectedTab("schedule")}
        >
          <FolderPlus size={20} />
          <span>Schedule</span>
        </div>
        <div
          className={`rounded-t-md justify-center flex border-b-2 border-custom-blue bg-${
            selectedTab == "scheduleUpload"
              ? "custom-orange-dark"
              : "custom-blue"
          } px-2 py-1 hover:cursor-pointer gap-2`}
          onClick={() => setSelectedTab("scheduleUpload")}
        >
          <FolderUp size={20} />
          <span>Schedule Upload</span>
        </div>
      </div>
      <div className="border border-grey"></div>
      {selectedTab == "schedule" && <ScheduleTab />}

      {selectedTab == "scheduleUpload" && <ScheduleUploadTab />}
    </div>
  );
};

export default Schedule;
