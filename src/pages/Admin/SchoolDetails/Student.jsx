import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  ChartLine,
  CircleX,
  ClipboardPlus,
  Download,
  Edit,
  FastForward,
  FileDown,
  Lock,
  Plus,
  Upload,
  User,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPI, postAPI, putAPI } from "../../../request/APIManager";
import { Circles } from "react-loader-spinner";
import Pagination from "../../../components/Pagination";
import ProfilePictureUploader from "../../../components/Faculty/ProfilePictureUploader";
import { useDropzone } from "react-dropzone";

function Student() {
  const navigation = useNavigate();

  const [dropdown, setDropdown] = useState("Active Students");
  const [dropdownTwo, setDropdownTwo] = useState(10);
  const [students, setStudents] = useState({ results: [] });
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [payloadData, setPayloadData] = useState({});
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [submit, setSubmit] = useState(false);
  const [gender, setGender] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [files, setFiles] = useState([]);
  const [uploadTab, setUplodTab] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [altContact, setAltContact] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [division, setDivision] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [modalLoader, setModalLoader] = useState(false);
  const [edit, setEdit] = useState();
  const [gradeMapping, setGradeMapping] = useState({});
  const [divisionList, setDivisionList] = useState([]);
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (!grade) {
      return;
    }
    const list = gradeMapping[grade]["divisions"].split(",");
    setDivisionList([...list]);
  }, [grade]);

  useEffect(() => {
    if (!edit) {
      return;
    }
    fetchStudentData();
  }, [edit]);

  useEffect(() => {
    let allowSubmit = true;

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !contact ||
      !email ||
      !admissionNumber ||
      !division ||
      !grade ||
      !date
    ) {
      allowSubmit = false;
    } else if (contact.length != 10) {
      allowSubmit = false;
    } else if (!validEmail(email)) {
      allowSubmit = false;
    }

    setSubmit(allowSubmit);
  }, [
    firstName,
    lastName,
    gender,
    email,
    admissionNumber,
    division,
    grade,
    date,
  ]);

  useEffect(() => {
    fetchAllGrades();
  }, []);

  const fetchAllGrades = async () => {
    const response = await getAPI(
      navigation,
      "/accounts/admin/grade-division-mapping/"
    );

    const gs = {};
    response.forEach((item) => (gs[item.grade] = item));
    setGradeMapping({ ...gs });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const uploadBulk = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await postAPI(
      navigation,
      "/accounts/admin/students-bulk-upload/",
      formData,
      true
    );
    if (response) {
      alert("Uploaded!");
    }
    setFile(null);
    setUplodTab(false);
    fetchStudentsData();
  };

  const handleSubmit = async () => {
    let response = false;

    if (edit) {
      const payload = {
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        Gender: gender,
        contact: contact,
        GradeId: grade,
        DivisionId: division,
        AdmissionNo: admissionNumber,
        IsActice: isActive,
        date_of_birth: date,
      };
      response = await putAPI(
        navigation,
        `accounts/admin/students/${edit}/`,
        payload
      );
    } else {
      const payload = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        contact: contact,
        GradeId: grade,
        DivisionId: division,
        AdmissionNo: admissionNumber,
        date_of_birth: date,
      };
      response = await postAPI(
        navigation,
        "accounts/admin/students/add/",
        payload
      );
    }

    if (response) {
      alert(edit ? "Student Updated" : "Student Created!");
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    setFirstName("");
    setLastName("");
    setGender("");
    setContact("");
    setAltContact("");
    setEmail("");
    setAdmissionNumber("");
    setGrade(null);
    setDivision(null);
    setIsActive(true);
    setOpen(false);
    setEdit(null);
    setDate(null);
  };

  const ModalLoader = () => {
    return (
      <div className="flex h-full items-center justify-center mt-10">
        <Circles />
      </div>
    );
  };

  const fetchStudentData = async () => {
    setModalLoader(true);
    const response = await getAPI(
      navigation,
      `accounts/admin/students/${edit}/`
    );
    setFirstName(response?.FirstName ?? "");
    setLastName(response?.LastName ?? "");
    setIsActive(response?.IsActive ?? "");
    setGender(response?.Gender ?? "");
    setEmail(response?.Email ?? "");
    setDivision(response?.DivisionId ?? "");
    setGrade(response?.GradeId ?? "");
    setContact(response?.PhoneNumber ?? "");
    setAdmissionNumber(response?.AdmissionNo ?? "");
    setDate(response?.date_of_birth);

    setModalLoader(false);
  };

  const handleChange = (value) => {
    setDropdown(value.target.value);
  };

  const BulkStudentUpload = () => {
    return (
      <div className="w-full">
        <form className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Upload a File</h2>

          <input
            type="file"
            onChange={handleFileChange}
            className="border-2 border-gray-300 p-2 rounded-lg file:border-none file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg hover:file:bg-blue-600"
          />

          {file && (
            <p className="text-sm text-gray-700">Selected file: {file.name}</p>
          )}
        </form>
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
          <div
            className={`${
              files.length != 1
                ? "cursor-pointer bg-custom-blue"
                : "bg-gray-500"
            } p-2 rounded-md border-2 text-sm font-semibold flex gap-2`}
            onClick={() => uploadBulk()}
          >
            <Upload size={18} />
            Upload
          </div>
        </div>
      </div>
    );
  };

  const handleChangeSecond = (value) => {
    setPageSize(value.target.value);
  };

  const fetchStudentsData = async () => {
    const response = await getAPI(
      navigation,
      `/accounts/admin/students/?page=${page}&items_per_page=${pageSize}&is_active=${isActive}`
    );
    setStudents({ ...response });
    setLoader(false);
  };

  useEffect(() => {
    fetchStudentsData();
  }, [page]);

  const handlePayload = (key, value) => {
    if (!value || value === "") {
      if (payloadData[key]) {
        delete payloadData[key];
      }
    } else {
      payloadData[key] = value;
    }
    setPayloadData({ ...payloadData });
  };

  const validEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  if (loader) {
    return (
      <div className="flex h-full items-center justify-center mt-10">
        <Circles />
      </div>
    );
  }

  return (
    <div>
      <Modal
        open={uploadTab}
        onClose={() => setUplodTab(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="px-10 content-center"
      >
        <Box className="bg-white p-10">
          <BulkStudentUpload />
        </Box>
      </Modal>
      <Modal
        open={open || edit}
        onClose={() => handleModalClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="w-full justify-center items-center flex h-full">
          <div className="bg-white px-10 py-5">
            <div className="flex">
              <div
                className="ml-auto cursor-pointer text-red-400"
                onClick={() => handleModalClose()}
              >
                <CircleX />
              </div>
            </div>
            {modalLoader && <ModalLoader />}

            {!modalLoader && (
              <div className="flex gap-6 mt-3">
                {/* <ProfilePictureUploader /> */}
                <div>
                  <div className="flex gap-4">
                    <TextField
                      label="First Name"
                      placeholder="First Name"
                      variant="outlined"
                      className="w-full"
                      value={firstName}
                      required
                      onChange={(value) => setFirstName(value.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      placeholder="Last Name"
                      variant="outlined"
                      className="w-full"
                      value={lastName}
                      required
                      onChange={(value) => setLastName(value.target.value)}
                    />
                  </div>

                  <div className="flex gap-4 mt-3">
                    <div>
                      <FormControl>
                        <InputLabel>Gender*</InputLabel>
                        <Select
                          value={gender}
                          label="Gender*"
                          onChange={(value) => {
                            setGender(value.target.value);
                          }}
                          className="w-40"
                          required
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="w-full">
                      <TextField
                        placeholder="Contact"
                        label="Contact"
                        variant="outlined"
                        className="w-full"
                        required
                        value={contact}
                        onChange={(value) => setContact(value.target.value)}
                      />
                      {contact && contact.length != 10 && (
                        <div className="text-red-500 text-sm">
                          Mobile number should be of 10 digits!
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      className="w-full"
                      required
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(value) => setEmail(value.target.value)}
                    />
                    <div>
                      {email && !validEmail(email) && (
                        <div className="text-red-500 text-sm">
                          Please input valid Email!
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <FormControl>
                      <InputLabel>Grade*</InputLabel>
                      <Select
                        value={grade}
                        label="Grade*"
                        onChange={(value) => {
                          setGrade(value.target.value);
                        }}
                        className="w-40"
                        required
                      >
                        {Object.keys(gradeMapping).map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel>Division*</InputLabel>
                      <Select
                        disabled={grade ? false : true}
                        value={division}
                        label="Division*"
                        onChange={(value) => {
                          setDivision(value.target.value);
                        }}
                        className="w-40"
                        required
                      >
                        {divisionList.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="mt-3">
                    <TextField
                      label="Admission Number"
                      variant="outlined"
                      className="w-full"
                      required
                      placeholder="Admission Number"
                      value={admissionNumber}
                      onChange={(value) =>
                        setAdmissionNumber(value.target.value)
                      }
                    />
                  </div>
                  <div>
                    Date Of Birth:{" "}
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="border p-2 rounded col-span-2 mt-2"
                    />
                  </div>
                  <div className="flex">
                    <label className="flex items-center gap-2 text-gray-600">
                      <input type="checkbox" className="accent-gray-500" />
                      Active
                    </label>
                    <div
                      className={`p-2 border-b-2 rounded-md items-center justify-center mt-2 ml-auto px-5
                  ${
                    submit == true
                      ? "hover:cursor-pointer bg-custom-blue"
                      : "bg-gray-500"
                  }`}
                      onClick={() => handleSubmit()}
                    >
                      <div className="font-bold text-xs ">Submit</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
      <div className="flex gap-5 mt-10">
        <div
          className="py-2 px-4 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer flex"
          onClick={() => setOpen(true)}
        >
          <div className="font-bold text-xs flex gap-2 justify-center items-center">
            <Plus size={14} /> Add Student
          </div>
        </div>
        <div
          className="py-2 px-4 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer flex"
          onClick={() => setUplodTab(true)}
        >
          <div className="font-bold text-xs flex gap-2 justify-center items-center">
            <Upload size={14} /> Bulk Upload
          </div>
        </div>
        {/* <div className="py-2 px-4 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer flex">
          <div className="font-bold text-xs flex gap-2 justify-center items-center">
            <FileDown size={14} /> Export Data
          </div>
        </div> */}
        {/* <div className="py-2 px-4 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer flex">
          <div className="font-bold text-xs flex gap-2 justify-center items-center">
            <ClipboardPlus size={14} /> Generate Report
          </div>
        </div> */}
        <div className="ml-auto flex-row">
          <div className="text-sm">Student List</div>
          <Select
            value={dropdown}
            displayEmpty
            onChange={handleChange}
            className="h-8"
          >
            <MenuItem value={"All Students"}>All Students</MenuItem>
            <MenuItem value={"Active Students"}>Active Students</MenuItem>
            <MenuItem value={"Inactive Students"}>Inactive Students</MenuItem>
            <MenuItem value={"Deleted Students"}>Deleted Students</MenuItem>
          </Select>
        </div>
        <div className="flex-row">
          <div className="text-sm">Page Size</div>
          <Select
            className="h-8"
            value={dropdownTwo}
            onChange={handleChangeSecond}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={500}>500</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
          </Select>
        </div>
      </div>

      <div className="mt-5">
        <table className="min-w-full border-collapse border border-gray-200 ">
          <thead className="bg-orange-100">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Grade</th>
              <th className="border border-gray-300 p-2 text-left">Division</th>
              <th className="border border-gray-300 p-2 text-left">Gender</th>
              <th className="border border-gray-300 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.results.map((item, index) => (
              <tr key={index} className="odd:bg-gray-50">
                {/* <td className="border border-gray-300 p-2">{item.photo}</td> */}
                <td className="border border-gray-300 p-2">{item.full_name}</td>
                {/* <td className="border border-gray-300 p-2">{item.UserId}</td> */}
                <td className="border border-gray-300 p-2">{item.GradeId}</td>
                <td className="border border-gray-300 p-2">
                  {item.DivisionId}
                </td>
                <td className="border border-gray-300 p-2">{item.Gender}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <Tooltip title="Edit">
                    <button
                      className="p-2 bg-custom-blue border-b-2 rounded-md"
                      onClick={() => {
                        setEdit(item.UserId);
                      }}
                    >
                      <Edit size={16} className="mr-1" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Change Password">
                    <button className="p-2 bg-custom-blue border-b-2 rounded-md">
                      <Lock size={16} className="mr-1" />
                    </button>
                  </Tooltip>
                  {/* <Tooltip title="Report">
                    <button className="p-2 bg-custom-blue border-b-2 rounded-md">
                      <ChartLine size={16} className="mr-1" />
                    </button>
                  </Tooltip> */}
                  {/* <Tooltip title="Migrate">
                    <button className="p-2 bg-custom-blue border-b-2 rounded-md">
                      <FastForward size={16} className="mr-1" />
                    </button>
                  </Tooltip> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center w-full justify-center mt-5">
          <Pagination
            currentPage={page}
            setCurrentPage={setPage}
            totalItems={students?.count}
            itemsPerPage={students?.items_per_page}
          />
        </div>
      </div>
    </div>
  );
}

export default Student;
