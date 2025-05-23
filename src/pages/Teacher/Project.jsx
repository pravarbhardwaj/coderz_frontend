import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAPI, postAPI } from "../../request/APIManager";
import SessionPage from "../../pages/Admin/Curriculum/SessionPage";
import CreateProject from "../../pages/Admin/CreateProject";
import CreateSession from "../../pages/Admin/SchoolDetails/CreateSession";
import AssetUploadForm from "../../components/AssetUploadForm";
import QuizForm from "../../components/QuizForm";

function Project({ myProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [division, setDivision] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [fileInputs, setFileInputs] = useState([{ type: "", file: null }]);
  const [modal, setModal] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [data, setData] = useState({
    project_submission: {
      teacher_evaluation: "",
    },
    id: null, 
  });
  const [role, setRole] = useState("");

  const [open, setOpen] = useState(false);
  const [upload, setUpload] = useState();
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [project, setProject] = useState({
    thumbnail: "",
    title: "",
    gradeTag: "",
    due_date: "",
    id: null,
  });

  const [session, setSession] = useState(false);
  const [learning, setLearning] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openSession, setOpenSession] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [openAssets, setOpenAssets] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [dropdown, setDropdown] = useState("All");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (value) => {
    setDropdown(value.target.value);
  };

  const handleOpen = (proj) => {
    setOpen(true);
    setProject({ ...proj });
  };

  const handleClose = () => {
    setUpload(null);
    setOpen(false);
  };

  const navigation = useNavigate();
  const handleModalClose = () => {
    setModal(false);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("No File Selected");
      return;
    }

    if (!learning) {
      alert("Please input your learning!");
      return;
    }

    const formData = new FormData();

    formData.append("submission_file", file);
    formData.append("project", project.id);
    formData.append("feedback", learning);

    const response = await postAPI(
      navigation,
      "/projects/project-submission/",
      formData,
      true
    );

    alert("Project Submitted Succesfully!");
    fetchCardData();
    handleClose();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const ProjectCard = ({ project }) => {
    return (
      <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
        {/* Project Image */}
        <div className="relative">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-40 object-cover rounded-lg"
          />
          {project.gradeTag && (
            <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-sm rounded-lg">
              {project.gradeTag}
            </span>
          )}
        </div>

        <div className="flex items-center">
          <h3 className="text-lg font-semibold mt-4">{project.title}</h3>

          {!project.is_completed && role == "Learner" && (
            <div className="ml-auto rounded-md bg-red-400 font-semibold text-white px-2">
              Pending
            </div>
          )}
          {project.is_completed && (
            <div className="ml-auto rounded-md bg-green-500 font-semibold text-white px-2">
              Completed
            </div>
          )}
        </div>

        <p className="text-gray-700 text-sm mt-2">
          Description:{" "}
          <span className="font-medium">{project.description}</span>
        </p>

        <p className="text-gray-700 text-sm mt-2">
          Reflectives:{" "}
          <span className="font-medium">{project.quizzes.length}</span>
        </p>

        {/* Action Buttons */}
        <div className="gap-3 mt-4 grid grid-cols-1 md:grid-cols-2  ">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => {
              setData({ ...project });
              setSession(true);
            }}
          >
            {role == "Learner" ? "View" : "Practice"}
          </button>

          {role === "Learner" &&
            project?.project_submission?.teacher_evaluation && (
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => {
                  setData({ ...project });
                  setFeedbackModal(true);
                }}
              >
                View Feedback
              </button>
            )}
          {role != "Learner" && (
            <>
              <button
                className="w-full bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => {
                  setEditProject({ ...project });
                  setModal(true);
                }}
              >
                Edit Project
              </button>
              <button
                className="w-full bg-blue-600 text-white py-2 px-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => {
                  setData({ ...project });
                  setOpenSession(true);
                }}
              >
                Add Session
              </button>
              <button
                className="w-full bg-blue-600 text-white py-2 px-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => {
                  setData({ ...project });
                  setOpenAssets(true);
                }}
              >
                Add Assets
              </button>
              <button
                className="w-full bg-blue-600 text-white py-2 px-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => {
                  setData({ ...project });
                  setOpenQuiz(true);
                }}
              >
                Add Quiz
              </button>
            </>
          )}
          {role == "Learner" && (
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => {
                setData({ ...project });
                handleOpen(project);
              }}
            >
              {!project.is_completed ? "Upload" : "Upload Again"}
            </button>
          )}
          {/* <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition">Edit</button> */}
        </div>
      </div>
    );
  };

  const getTeacherProjects = async () => {
    let url = "projects/teacher/projects/";

    if (dropdown != "All") {
      url += `?group_id=${dropdown}`;
    }
    const response = await getAPI(navigation, url);
    groups.forEach((group) => {
      console.log("group", group[1], group[0]);
    });
    console.log("groups", response?.groups);
    setGroups([...response?.groups]);
    setProjectData(response?.data);
  };

  const getAdminProjects = async () => {
    const response = await getAPI(
      navigation,
      "projects/classroom-projects/list/"
    );

    setProjectData(response.results);
  };

  const getStudentProjects = async () => {
    let response = null;
    response = await getAPI(navigation, "projects/student/projects/");
    setProjectData(response);
  };

  const fetchCardData = async () => {
    setLoading(true);
    try {
      if (localStorage.getItem("role") == "Learner") {
        await getStudentProjects();
        setRole("Learner");
      } else if (localStorage.getItem("role") == "Admin") {
        await getAdminProjects();
        setRole("Admin");
      } else {
        await getTeacherProjects();
        setRole("Teacher");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, [dropdown]);

  const ProjectGrid = () => {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Projects
          </h2>

          {role !== "Learner" && !loading && (
            <>
              <div className="ml-6">
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Group Filter
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dropdown}
                    label="Group Filter"
                    onChange={handleChange}
                    className="w-full min-w-40"
                    disabled={groups.length == 0}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    {groups.map((group) => (
                      <MenuItem key={group[1]} value={group[1]}>
                        {group[0]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ml-auto px-2"
                onClick={() => {
                  setData({
                    project_submission: {
                      teacher_evaluation: "",
                    },
                    ...project,
                  });
                  setOpenCreate(true);
                }}
              >
                Create Project
              </button>
            </>
          )}
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-600 text-2xl">
            Loading projects...
          </div>
        ) : projectData.length === 0 ? ( // NEW
          <div className="text-center py-10 text-gray-600 text-2xl">
            No Projects Assigned
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {projectData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Modal open={feedbackModal} onClose={() => setFeedbackModal(false)}>
        <Box sx={style}>
          <h2 className="text-lg font-semibold mb-4">Submission Details</h2>
          <div className="mt-10">
            <TextField
              label="Feedback"
              multiline
              required
              fullWidth
              rows={4}
              value={data?.project_submission?.teacher_evaluation}
              disabled={true}
            />
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outlined" onClick={() => setFeedbackModal(false)}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-auto"
      >
        <Box className="w-full justify-center items-center flex max-h-fit my-10">
          <div className="bg-white px-10 py-5">
            <div className="flex">
              <div
                className="ml-auto cursor-pointer text-red-400"
                onClick={() => setOpenCreate(false)}
              >
                <CircleX />
              </div>
            </div>
            <CreateProject
              navigation={navigation}
              getAdminProjects={
                localStorage.getItem("role") == "Admin"
                  ? getAdminProjects
                  : getTeacherProjects
              }
              setOpenCreate={setOpenCreate}
              // editData={editProject}
              edit={false}
            />
          </div>
        </Box>
      </Modal>
      <Modal
        open={openQuiz}
        onClose={() => setOpenQuiz(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-auto"
      >
        <Box className="w-full justify-center items-center flex max-h-fit my-10">
          <div className="bg-white px-10 py-5">
            <div className="flex">
              <div
                className="ml-auto cursor-pointer text-red-400"
                onClick={() => setOpenQuiz(false)}
              >
                <CircleX />
              </div>
            </div>
            <QuizForm
              navigation={navigation}
              data={data}
              getAdminProjects={
                localStorage.getItem("role") === "Admin"
                  ? getAdminProjects
                  : getTeacherProjects
              }
            />
          </div>
        </Box>
      </Modal>
      <Modal
        open={openAssets}
        onClose={() => setOpenAssets(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-auto"
      >
        <Box className="w-full justify-center items-center flex max-h-fit my-10">
          <div className="bg-white px-10 py-5">
            <div className="flex">
              <div
                className="ml-auto cursor-pointer text-red-400"
                onClick={() => setOpenAssets(false)}
              >
                <CircleX />
              </div>
            </div>
            <AssetUploadForm
              project={data}
              navigation={navigation}
              setOpenAssets={setOpenAssets}
              getAdminProjects={
                localStorage.getItem("role") === "Admin"
                  ? getAdminProjects
                  : getTeacherProjects
              }
            />
          </div>
        </Box>
      </Modal>
      <Modal
        open={openSession}
        onClose={() => setOpenSession(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-auto"
      >
        <Box className="w-full justify-center items-center flex max-h-fit my-10">
          <CreateSession
            projectId={data?.id}
            setOpenSession={setOpenSession}
            navigation={navigation}
          />
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-auto"
      >
        <Box className="w-full justify-center items-center flex max-h-fit my-10">
          <div className="bg-white px-10 py-5">
            <div className="flex">
              <div
                className="ml-auto cursor-pointer text-red-400"
                onClick={() => handleClose()}
              >
                <CircleX />
              </div>
            </div>

            <div className="flex gap-5 mt-4">
              <div className="relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                {project.gradeTag && (
                  <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-sm rounded-lg">
                    {project.gradeTag}
                  </span>
                )}
              </div>
              <div>
                <div>Due Date</div>
                <div>{project.due_date}</div>
              </div>
            </div>
            <div>
              <form className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Upload a File</h2>

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border-2 border-gray-300 p-2 rounded-lg file:border-none file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg hover:file:bg-blue-600"
                />

                {file && (
                  <p className="text-sm text-gray-700">
                    Selected file: {file.name}
                  </p>
                )}
              </form>
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
                onChange={(event) => setLearning(event.target.value)}
              ></textarea>
            </div>
            <div className="flex mt-2 gap-2 font-bold text-xs ">
              {/* <div
                className="p-2 border-b-2 rounded-md items-center justify-center bg-custom-blue hover:cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Save Uploads
              </div> */}
              <div
                className="p-2 border-b-2 rounded-md items-center justify-center bg-custom-blue hover:cursor-pointer ml-auto"
                onClick={handleSubmit}
              >
                Submit For Review
              </div>
            </div>
          </div>
        </Box>
      </Modal>
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
            <CreateProject
              navigation={navigation}
              getAdminProjects={
                localStorage.getItem("role") == "Admin"
                  ? getAdminProjects
                  : getTeacherProjects
              }
              editData={editProject}
              setOpenCreate={setOpenCreate}
              edit={true}
            />
          </div>
        </Box>
      </Modal>
      <div className="flex w-full">
        {/* <button className="px-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ml-auto" onClick={() => setModal(true)}>Create New</button> */}
      </div>

      {!session && <ProjectGrid />}
      {session && (
        <SessionPage
          setSession={setSession}
          data={data}
          navigation={navigation}
          projectId={data.id}
          getStudentProjects={getStudentProjects}
        />
      )}
    </div>
  );
}

export default Project;
