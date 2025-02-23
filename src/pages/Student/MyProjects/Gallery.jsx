import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import ProjectCard from "../../../components/ProjectCard";
import React, { useRef, useState } from "react";
import { CircleX, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import GalleryCard from "../../../components/GalleryCard";
import SelectionTab from "../../../components/SelectionTab";

function Gallery() {
  const [open, setOpen] = useState(false);
  const [upload, setUpload] = useState();
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [dropdown, setDropdown] = useState("All");
  const [practice, setPractice] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Parameters");
  const tabs = ["Parameters", "Remarks"];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  const handleChange = (value) => {
    setDropdown(value.target.value);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const data = [
    {
      id: 1,
      title: "Drag & Drop",
      description: "Classroom | Resubmit",
      shared_date: "22 Jun 2024",
      due_date: "29 Jun 2024",
      image: "some_url",
      teachers_feedback: "Well Done",
      my_learning: "drag and drop tech",
      ratings: [
        {
          title: "Classroom Engagement",
          rating: "Satisfactory",
        },
        {
          title: "Tool Knowledge",
          rating: "Distinguished",
        },
        {
          title: "Subject Knowledge",
          rating: "Competent",
        },
        {
          title: "Computational Thinking",
          rating: "Satisfactory",
        },
        {
          title: "Classroom Engagement",
          rating: "Proficient",
        },
      ],
    },
    {
      id: 2,
      title: "Drag & Drop",
      description: "Classroom | Resubmit",
      shared_date: "22 Jun 2024",
      due_date: "29 Jun 2024",
      image: "some_url",
      teachers_feedback: "Well Done",
      my_learning: "drag and drop tech",
    },
    {
      id: 3,
      title: "Drag & Drop",
      description: "Classroom | Resubmit",
      shared_date: "22 Jun 2024",
      due_date: "29 Jun 2024",
      image: "some_url",
      teachers_feedback: "Well Done",
      my_learning: "drag and drop tech",
    },
    {
      id: 4,
      title: "Drag & Drop",
      description: "Classroom | Resubmit",
      shared_date: "22 Jun 2024",
      due_date: "29 Jun 2024",
      image: "some_url",
      teachers_feedback: "Well Done",
      my_learning: "drag and drop tech",
    },
    {
      id: 5,
      title: "Drag & Drop",
      description: "Classroom | Resubmit",
      shared_date: "22 Jun 2024",
      due_date: "29 Jun 2024",
      image: "some_url",
      teachers_feedback: "Well Done",
      my_learning: "drag and drop tech",
    },
  ];

  const handleModalClose = () => {
    setUpload(null);
    setPractice(false);
    setOpen(false);
  };

  const Parameters = () => {
    return (
      <div className="mt-5">
        <table className="gap-10">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Parameters
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Explanation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                Classroom Engagement
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Behaviour | Curious | Listener
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                Tool Knowledge
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Display absolute Proficiency over tool and commands
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                Subject Knowledge
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Application of concept
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                Computational Thinking
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Actively Seeks and suggest solution to problems
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Creativity</td>
              <td className="border border-gray-300 px-4 py-2">
                Preparation | Incubation | Illumination | Improvisation
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const Remarks = () => {
    return (
      <div className="mt-5">
        <table className="gap-10">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Evaluation Remarks
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Explanation
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                <div className="flex gap-2">
                  <div className="bg-custom-blue px-2">S</div>Satisfactory
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Student has a solid understanding of the subject matter.
              </td>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                25
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                <div className="flex gap-2">
                  <div className="bg-custom-blue px-2">C</div>Competent
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Student has a solid understanding of the subject matter.
              </td>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                50
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                <div className="flex gap-2">
                  <div className="bg-custom-blue px-2">P</div>Proficient
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Student has a solid understanding of the subject matter.
              </td>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                75
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                <div className="flex gap-2">
                  <div className="bg-custom-blue px-2">D</div>Distinguished
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Student has a solid understanding of the subject matter.
              </td>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                100
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  const Description = () => {
    return (
      <div className="rounded-md border-2 shadow-md p-2">
        <SelectionTab
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          tabs={tabs}
        />
        <div>{selectedTab == "Parameters" && <Parameters />}</div>
        <div>{selectedTab == "Remarks" && <Remarks />}</div>
      </div>
    );
  };

  const Ratings = ({ name, rating }) => {
    return (
      <div className="p-2 rounded-r-md">
        <div className="flex mt-2">
          <div className="bg-custom-orange-dark p-2 pr-5 rounded-l-md flex items-center flex-auto">
            {name}
          </div>
          <div className="bg-custom-orange-light rounded-r-md px-2">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  checked={rating == "Satisfactory" ? true : false}
                  disabled={true}
                  control={<Radio />}
                  label="Satisfactory"
                />
                <FormControlLabel
                  checked={rating == "Competent" ? true : false}
                  disabled={true}
                  control={<Radio />}
                  label="Competent"
                />
                <FormControlLabel
                  checked={rating == "Proficient" ? true : false}
                  disabled={true}
                  control={<Radio />}
                  label="Proficient"
                />
                <FormControlLabel
                  checked={rating == "Distinguished" ? true : false}
                  disabled={true}
                  control={<Radio />}
                  label="Distinguished"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {upload && (
        <Modal
          open={open}
          onClose={() => handleModalClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="overflow-auto"
        >
          <Box className="w-full justify-center items-center flex max-h-fit my-10">
            <div className="bg-white px-10 py-5">
              <div className="flex">
                <div
                  className="ml-auto cursor-pointer text-red-400"
                  onClick={() => handleModalClose()}
                >
                  <CircleX />
                </div>
              </div>
              <div className="font-bold text-2xl">{upload.title}</div>

              <div className="mt-2 border-2 p-2">
                <div className="text-sm">
                  <span className="items-center">My Learning</span>
                  <span className="text-red-500"> *</span>{" "}
                </div>
                <textarea
                  className="w-full border-2 rounded-md p-2 mt-1"
                  placeholder="Enter what have you learned here"
                ></textarea>
              </div>
              <div className="mt-2 border-2 p-2">
                <div className="text-sm">
                  <span className="items-center">Faculty's Feedback</span>
                  <span className="text-red-500"> *</span>{" "}
                </div>
                <textarea
                  className="w-full border-2 rounded-md p-2 mt-1"
                  placeholder="Enter what have you learned here"
                ></textarea>
              </div>
              <div
                className="p-2 border-b-2 rounded-md items-center justify-center bg-custom-blue hover:cursor-pointer ml-auto text-sm font-bold text-center mt-2"
                onClick={() => null}
              >
                Download Report
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div>Assessment Rubrics</div>
                <div
                  className="p-2 border-b-2 rounded-md items-center justify-center bg-custom-blue hover:cursor-pointer"
                  onClick={() =>
                    anchorEl ? setAnchorEl(false) : setAnchorEl(true)
                  }
                >
                  Description
                </div>
              </div>
              {upload &&
                !anchorEl &&
                upload.ratings.map((item) => (
                  <Ratings name={item.title} rating={item.rating} />
                ))}
              {anchorEl && <Description />}
            </div>
          </Box>
        </Modal>
      )}

      <div className="mt-5">
        <div className="flex">
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Select Projects
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dropdown}
              label="Select Projects"
              onChange={handleChange}
              className="w-60"
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"some name"}>some name</MenuItem>
              <MenuItem value={"some name 2"}>some name 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-5">
          {data.map((item) => (
            <div className="col-span-12 md:col-span-4">
              <GalleryCard
                data={item}
                key={item.id}
                setOpen={setOpen}
                setUpload={setUpload}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
