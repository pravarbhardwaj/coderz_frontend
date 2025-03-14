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
import { getAPI } from "../../../request/APIManager";
import { Circles } from "react-loader-spinner";
import Pagination from "../../../components/Pagination";
import ProfilePictureUploader from "../../../components/Faculty/ProfilePictureUploader";

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

  const handleChange = (value) => {
    setDropdown(value.target.value);
  };

  const handleChangeSecond = (value) => {
    setPageSize(value.target.value);
  };

  const fetchStudentData = async () => {
    const response = await getAPI(
      navigation,
      `/accounts/admin/students/?page=${page}&items_per_page=${page_size}&is_active=${is_active}`
    );
    console.log("REsponse = ", response);
    setStudents({ ...response });
    setLoader(false);
  };

  useEffect(() => {
    fetchStudentData();
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
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="w-full justify-center items-center flex h-full">
          <div className="bg-white px-10 py-5">
            <div className="flex">
              <div
                className="ml-auto cursor-pointer text-red-400"
                onClick={() => setOpen(false)}
              >
                <CircleX />
              </div>
            </div>
            <div className="flex gap-6 mt-3">
              <ProfilePictureUploader />
              <div>
                <div className="flex gap-4">
                  <TextField
                    label="First Name"
                    placeholder="First Name"
                    variant="outlined"
                    className="w-full"
                    required
                    onChange={(value) =>
                      handlePayload("first_name", value.target.value)
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    placeholder="Last Name"
                    variant="outlined"
                    className="w-full"
                    required
                    onChange={(value) =>
                      handlePayload("last_name", value.target.value)
                    }
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
                          handlePayload("gender", value.target.value);
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
                      onChange={(value) =>
                        handlePayload("contact", value.target.value)
                      }
                    />
                    {payloadData["contact"] &&
                      payloadData["contact"].length != 10 && (
                        <div className="text-red-500 text-sm">
                          Mobile number should be of 10 digits!
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex gap-4 mt-3">
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      className="w-full"
                      required
                      placeholder="Email"
                      type="email"
                      onChange={(value) =>
                        handlePayload("email", value.target.value)
                      }
                    />

                    {payloadData["email"] &&
                      !validEmail(payloadData["email"]) && (
                        <div className="text-red-500 text-sm">
                          Please input valid Email!
                        </div>
                      )}
                  </div>
                  <FormControl>
                    <InputLabel>Gender*</InputLabel>
                    <Select
                      value={gender}
                      label="Gender*"
                      onChange={(value) => {
                        setGender(value.target.value);
                        handlePayload("gender", value.target.value);
                      }}
                      className="w-40"
                      required
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel>Gender*</InputLabel>
                    <Select
                      value={gender}
                      label="Gender*"
                      onChange={(value) => {
                        setGender(value.target.value);
                        handlePayload("gender", value.target.value);
                      }}
                      className="w-40"
                      required
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
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
                    onChange={(value) =>
                      handlePayload("email", value.target.value)
                    }
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
                    onClick={() => null}
                  >
                    <div className="font-bold text-xs ">Submit</div>
                  </div>
                </div>
              </div>
            </div>
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
        <div className="py-2 px-4 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer flex">
          <div className="font-bold text-xs flex gap-2 justify-center items-center">
            <Upload size={14} /> Bulk Upload
          </div>
        </div>
        <div className="py-2 px-4 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer flex">
          <div className="font-bold text-xs flex gap-2 justify-center items-center">
            <FileDown size={14} /> Export Data
          </div>
        </div>
        <div className="py-2 px-4 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer flex">
          <div className="font-bold text-xs flex gap-2 justify-center items-center">
            <ClipboardPlus size={14} /> Generate Report
          </div>
        </div>
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
              {/* <th className="border border-gray-300 p-2 text-left">Photo</th> */}
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">ID</th>
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
                <td className="border border-gray-300 p-2">{item.UserId}</td>
                <td className="border border-gray-300 p-2">{item.GradeId}</td>
                <td className="border border-gray-300 p-2">
                  {item.DivisionId}
                </td>
                <td className="border border-gray-300 p-2">{item.Gender}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <Tooltip title="Edit">
                    <button className="p-2 bg-custom-blue border-b-2 rounded-md">
                      <Edit size={16} className="mr-1" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Change Password">
                    <button className="p-2 bg-custom-blue border-b-2 rounded-md">
                      <Lock size={16} className="mr-1" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Report">
                    <button className="p-2 bg-custom-blue border-b-2 rounded-md">
                      <ChartLine size={16} className="mr-1" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Migrate">
                    <button className="p-2 bg-custom-blue border-b-2 rounded-md">
                      <FastForward size={16} className="mr-1" />
                    </button>
                  </Tooltip>
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
