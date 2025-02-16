import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PPTViewer from "../../../components/PPTViewer";
import SelectionTab from "../../../components/SelectionTab";
import { MoveLeft } from "lucide-react";
import React, { useRef, useState } from "react";

const PPT = () => {
  return (
    <div>
      <PPTViewer />
    </div>
  );
};

const Overview = ({data}) => {

  const videoRef = useRef(null);

  return (
    <div>
 
      <div className="mt-2">{data.description}</div>
      <div className="font-bold text-xl mt-5">Final Output</div>
      <video
        src={
          data.video_url
        }
        controls
        className="w-full mt-2 rounded-md"
      ></video>
    </div>
  );
};

function ProjectPage({ setProject, projectId }) {
  const [selectedTab, setSelectedTab] = useState("Overview");
  const tabs = ["Overview", "Session PPT"];
  const [dropdown, setDropdown] = useState("All");

  const data = {
    session_data: ["Some Name", "Some Name 2"],
    title: "Some Name",
    description: "Some Description",
    video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  }

  const handleChange = (value) => {
    setDropdown(value.target.value);
  };
  return (
    <div>
      <div className="mt-10">
        <div className="flex gap-5 items-center">
          <div onClick={() => setProject(false)} className="cursor-pointer">
            <MoveLeft />
          </div>
          <div className="font-bold text-2xl">Some Name</div>
        </div>
        <div className="mt-5">
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Select Sessions
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dropdown}
              label="Select Sessions"
              onChange={handleChange}
              className="w-56"
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"some name"}>some name</MenuItem>
              <MenuItem value={"some name 2"}>some name 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <SelectionTab
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          tabs={tabs}
        />
        <div className="font-bold text-xl mt-5">{data.title}</div>
      </div>
      {selectedTab === "Session PPT" && <PPT />}
      {selectedTab === "Overview" && <Overview data={data}/>}
    </div>
  );
}

export default ProjectPage;
