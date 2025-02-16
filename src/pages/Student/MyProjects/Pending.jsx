import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import ProjectCard from "../../../components/ProjectCard";
import React, { useRef, useState } from "react";
import { CircleX, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

function Pending() {
  const [open, setOpen] = useState(false);
  const [upload, setUpload] = useState();
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [dropdown, setDropdown] = useState("All");
  const [practice, setPractice] = useState(false)

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
      my_learning: "drag and drop tech"
    },
    {
      id: 2,
      title: "Drag & Drop",
      description: "Classroom | Resubmit",
      shared_date: "22 Jun 2024",
      due_date: "29 Jun 2024",
      image: "some_url", 
      teachers_feedback: "Well Done",
      my_learning: "drag and drop tech"
    },
    {
      id: 3,
      title: "Drag & Drop",
      description: "Classroom | Resubmit",
      shared_date: "22 Jun 2024",
      due_date: "29 Jun 2024",
      image: "some_url", 
      teachers_feedback: "Well Done",
      my_learning: "drag and drop tech"
    },
    {
      id: 4,
      title: "Drag & Drop",
      description: "Classroom | Resubmit",
      shared_date: "22 Jun 2024",
      due_date: "29 Jun 2024",
      image: "some_url", 
      teachers_feedback: "Well Done",
      my_learning: "drag and drop tech"
    },
    {
      id: 5,
      title: "Drag & Drop",
      description: "Classroom | Resubmit",
      shared_date: "22 Jun 2024",
      due_date: "29 Jun 2024",
      image: "some_url", 
      teachers_feedback: "Well Done",
      my_learning: "drag and drop tech"
    },
  ];

  const handleModalClose = () => {
    setUpload(null);
    setPractice(false)
    setOpen(false);
  };
  return (
    <div>
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
           {!practice && <div className="flex gap-5 mt-4">
              <div>Some Image</div>
              <div>
                <div>Due Date</div>
                <div>29 Jun 2024</div>
              </div>
            </div>}
            {practice && 
            <div className="mt-4">
            <TextField
                              id="outlined-basic"
                              label="Project Name*"
                              variant="outlined"
                              className="w-full"
                            />
                            </div>
            }
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
            <div className="mt-2 text-gray-500 text-sm">
              <p>
                - File Type Accepted JPG, PNG, JPEG and Maximum File Size 10 MB
              </p>
              <p>- File Type Accepted MP3 and Maximum Audio File Size 100 MB</p>
              <p>- File Type Accepted MP4 and Maximum Video File Size 100 MB</p>
              <p>- File Type Accepted PDF and Maximum PDF File Size 15 MB</p>
              <p>- File Type Accepted Docx and Maximum Docx File Size 15 MB</p>
              <p>- File Type Accepted Zip and Maximum Zip File Size 15 MB</p>
              <p>
                - File Type Accepted Notepad and Maximum Notepad File Size 15 MB
              </p>
              <p>
                - File Type Accepted Powerpoint and Maximum Powerpoint File Size
                25 MB
              </p>
              <p>
                - File Type Accepted Excel and Maximum Excel File Size 15 MB
              </p>
            </div>
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
            <div className="flex mt-2 gap-2 font-bold text-xs ">
              <div
                className="p-2 border-b-2 rounded-md items-center justify-center bg-custom-blue hover:cursor-pointer"
                onClick={() => null}
              >
                Save Uploads
              </div>
              <div
                className="p-2 border-b-2 rounded-md items-center justify-center bg-custom-blue hover:cursor-pointer ml-auto"
                onClick={() => null}
              >
                Submit For Review
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <div className="mt-5">
        <div className="flex">
      <FormControl>
      <InputLabel id="demo-simple-select-label">Select Projects</InputLabel>
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
            <div className="ml-auto">
              <div
                className="p-2 border-b-2 rounded-md items-center justify-center bg-custom-blue hover:cursor-pointer"
                onClick={() => {
                    setPractice(true)
                    setOpen(true)  
                }}
              >
                <div className="flex gap-2 items-center"><Upload size={18}/> Practice Project</div>
                
              </div>
             
              </div>
          </div>
        <div className="grid grid-cols-12 gap-4 mt-5">
          
            {data.map((item) => (
              <div className="col-span-12 md:col-span-4">
              <ProjectCard
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

export default Pending;
