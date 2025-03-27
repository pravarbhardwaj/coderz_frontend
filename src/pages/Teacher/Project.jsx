import { Box, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import SelectionTab from "../../components/SelectionTab";
import React, { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAPI } from "../../request/APIManager";
import SessionPage from "../../pages/Admin/Curriculum/SessionPage";

function Project() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [division, setDivision] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [fileInputs, setFileInputs] = useState([{ type: "", file: null }]);
  const [modal, setModal] = useState(false)
  const [projectData, setProjectData] = useState([])
  const [sessionName, setSessionName] = useState();
  const [data, setData] = useState()
  
  const [session, setSession] = useState(false)
    
  
    const navigation = useNavigate()
  const handleModalClose = () => {
    setModal(false)
  }
  const handleAddInput = () => {
    setFileInputs([...fileInputs, { type: "", file: null }]);
  };

  // Handle file type change
  const handleTypeChange = (index, event) => {
    const newFileInputs = [...fileInputs];
    newFileInputs[index].type = event.target.value;
    setFileInputs(newFileInputs);
  };

  // Handle file selection
  const handleFileChange = (index, event) => {
    const newFileInputs = [...fileInputs];
    newFileInputs[index].file = event.target.files[0];
    setFileInputs(newFileInputs);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    fileInputs.forEach((input, index) => {
      if (input.file && input.type) {
        formData.append(`files[${index}][type]`, input.type);
        formData.append(`files[${index}][file]`, input.file);
      }
    });


    // try {
    //   const response = await axios.post("https://your-api-url.com/upload", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });

    //   setMessage("Files uploaded successfully!");
    // } catch (error) {
    //   setMessage("Error uploading files. Please try again.");
    // }
  };
  


    // Remove file input
    const handleRemoveInput = (index) => {
      const newFileInputs = fileInputs.filter((_, i) => i !== index);
      setFileInputs(newFileInputs);
    };
  const ProjectCard = ({ project }) => {
    return (
      <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
        {/* Project Image */}
        {/* <div className="relative">
          <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-lg" />
          {project.gradeTag && (
            <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-sm rounded-lg">
              {project.gradeTag}
            </span>
          )}
        </div> */}
  
        {/* Project Details */}
        <h3 className="text-lg font-semibold mt-4">{project.title}</h3>
        {/* <p className="text-gray-600 text-sm">Module: <span className="font-medium">{project.module}</span></p> */}
        {/* <p className="text-gray-600 text-sm">Grade: <span className="font-medium">{project.grade}</span></p> */}
        {/* <p className="text-gray-600 text-sm">Tool: <span className="font-medium">{project.tool}</span></p> */}
        {/* <p className="text-gray-600 text-sm">Type: <span className="font-medium">{project.type}</span></p> */}
  
        {/* Session Details */}
        {/* <div className="mt-3 flex items-center space-x-2 text-sm">
          <p className="text-gray-700">Session Completed:</p>
          <span className={`w-3 h-3 rounded-full ${project.sessionCompleted ? "bg-green-500" : "bg-gray-400"}`}></span>
          <span>{project.sessionCompleted ? "1/1" : "0/1"}</span>
        </div> */}
  
        {/* <div className="flex items-center space-x-2 text-sm">
          <p className="text-gray-700">Session Shared:</p>
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          <span>0/1</span>
        </div> */}

      <p className="text-gray-700 text-sm mt-2">Description: <span className="font-medium">{project.description}</span></p>

        <p className="text-gray-700 text-sm mt-2">Reflectives: <span className="font-medium">{project.quizzes.length}</span></p>
  
        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" onClick={() => {
            setData({...project})
            setSession(true)}}>Practice</button>
          {/* <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition">Edit</button> */}
        </div>
      </div>
    );
  };
  

  const getTeacherProjects = async () => {
    const response =  await getAPI(navigation, "projects/teacher/projects/")
   
    console.log("response = ", response)


    setProjectData(response)
  }

  useEffect(() => {
    getTeacherProjects()
  }, [])

   
  const ProjectGrid = () => {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Classroom Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    );
  };
  


  const CreateProject = () => {
    return (
      <div>
      <div className="flex gap-5 w-full">
      <div className="w-full">
        <InputLabel>Title*</InputLabel>
        <TextField
          label="Title"
          placeholder="First Name"
          variant="outlined"
          className="w-full"
          required
          value={title}
          onChange={(value) => setTitle(value.target.value)}
        />
      </div>
      <div>
        <InputLabel>Grade*</InputLabel>
        <Select
          value={grade}
          label="Grade*"
          onChange={(value) => {
            // setGender(value.target.value);
            setGrade(value.target.value);
          }}
          className="w-40"
          required
        >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>
      </div>
      <div>
        <InputLabel>Division*</InputLabel>
        <Select
          value={division}
          label="Division*"
          onChange={(value) => {
            // setGender(value.target.value);
            setDivision(value.target.value);
          }}
          className="w-40"
          required
        >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>
      </div>

   
    </div>
    
   </div>
    )
  }
  
  return (
    <div>
      <Modal
        open={modal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="fixed overflow-auto"
      >
        <Box className="w-full justify-center items-center flex h-fit">
          <div className="bg-white px-10 py-5">
            <div className="flex">
              <div
                className="ml-auto cursor-pointer text-red-400"
                onClick={handleModalClose}
              >
                <CircleX />
              </div>
            </div>
            <CreateProject />
          </div>
        </Box>
      </Modal>
      <div className="flex w-full">
      <div className="text-xl font-bold mt-5">My Class</div>
      {/* <button className="px-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ml-auto" onClick={() => setModal(true)}>Create New</button> */}

      </div>
     
    
    {!session && <ProjectGrid />}
      {session && (
        <SessionPage setSession={setSession} renderSession={sessionName} data={data} navigation={navigation}/>
      )}


  </div>);
}

export default Project;
