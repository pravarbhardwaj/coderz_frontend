import React, { useEffect, useRef, useState } from "react";
import { CircleX, Edit, Lock, Plus, User, Users } from "lucide-react";
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
import axiosConfig from "../../../request/request";
import Grades from "../../../components/Faculty/Grades";
import ProfilePictureUploader from "../../../components/Faculty/ProfilePictureUploader";
import { getAPI, postAPI } from "../../../request/APIManager";
import { useNavigate, useNavigation } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { Circles, LineWave } from "react-loader-spinner";
import Divisions from "../../../components/Faculty/Divisions";

function Faculty() {
  const navigation = useNavigate();

  const [faculty, setFaculty] = useState([]);
  const [response, setResponse] = useState({});
  const [loader, setLoader] = useState(true);

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [contact, setContact] = useState("")
  const [altContact, setAltContact] = useState("")
  const [email, setEmail] = useState("")
  const [IsActive, setIsActive] = useState(true)
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [submit, setSubmit] = useState(false);
  const [gender, setGender] = useState("");
  const [edit, setEdit] = useState();
  const [modalLoader, setModalLoader] = useState(false);
  const [gdMapping, setGdMapping] = useState({})

  useEffect(() => {
    console.log("Reacherd  ", gdMapping)
  }, [gdMapping])

  const fetchFacultyData = async () => {
    const response = await getAPI(
      navigation,
      `accounts/admin/teachers/?page=${page}`
    );
    console.log("RESPONSE = ", response);
    setResponse({ ...response });
    setFaculty([...response.results]);
    setLoader(false);
  };

  useEffect(() => {
    fetchFacultyData();
  }, [page]);

 
  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
  
  useEffect(() => {
    let allowSubmit = true;


    const editList = ["FirstName", "LastName", "Gender", "email"];

    const newList = ["first_name", "last_name", "gender", "contact", "email"];

    const listToUse = edit ? editList : newList;
    
      if (!firstName || !lastName || !gender || !contact || !email) {
        allowSubmit = false;
      } else if ( contact.length != 10)
       {
        allowSubmit = false;
      } else if (!validEmail(email)) {
        allowSubmit = false;
      }
    

    setSubmit(allowSubmit);
  }, [firstName, lastName, gender, email]);

  const addFaculty = async () => {
    const payload = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      contact: contact,
      grade_division_mapping: gdMapping,
      password: "test"
    }
    const response = await postAPI(navigation, "accounts/admin/teachers/add/", payload);
    if (!response) {
      return
    }
    alert("Faculty Created")
    handleModalClose()
    console.log("REsponse = ", response)
  };

  const fetchTeacherData = async () => {
    setModalLoader(true);
    const response = await getAPI(
      navigation,
      `accounts/admin/teachers/${edit}/`
    );
    setFirstName(response?.FirstName ?? "");
    setLastName(response?.LastName ?? "");
    setIsActive(response?.IsActive ?? "")
    setGender(response?.Gender ?? "")
    setEmail(response?.email ?? "")
    setContact(response?.contact ?? "")
    setModalLoader(false);
  };

  useEffect(() => {
    if (!edit) {
      return;
    }
    fetchTeacherData();
  }, [edit]);

  if (loader) {
    return (
      <div className="flex h-full items-center justify-center mt-10">
        <Circles />
      </div>
    );
  }

  const handleModalClose = () => {
    setFirstName("")
    setLastName("")
    setGender("")
    setContact("")
    setAltContact("")
    setEmail("")
    setGdMapping({})
    setIsActive(true)
    setOpen(false);
    setEdit(null);
  };
  

  const ModalLoader = () => {
    return (
      <div className="flex h-full items-center justify-center mt-10">
        <Circles />
      </div>
    );
  };
  const modalContent = 
    (
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
              value={firstName}
              onChange={(value) =>
                setFirstName(value.target.value)
              }
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              placeholder="Last Name"
              variant="outlined"
              className="w-full"
              required
              value={lastName}
              onChange={(value) =>
                setLastName(value.target.value)
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
                    // setGender(value.target.value);
                   setGender(value.target.value)
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
                value={contact}
                label="Contact"
                variant="outlined"
                className="w-full"
                required
                onChange={(value) =>
                  setContact(value.target.value)
                }
              />
              {
                contact.length != 10 && (
                  <div className="text-red-500 text-sm">
                    Mobile number should be of 10 digits!
                  </div>
                )}
            </div>
            <TextField
              label="Alternative Contact"
              value={altContact}
              placeholder="Alternative Contact"
              variant="outlined"
              className="w-full"
            />
          </div>
          <div className="flex gap-4 mt-3">
            <div className="w-full">
              <TextField
                id="outlined-basic"
                label="Email"
                value={email}
                variant="outlined"
                className="w-full"
                required
                placeholder="Email"
                type="email"
                onChange={(value) => setEmail(value.target.value)}
              />

              {!validEmail(email) && (
                <div className="text-red-500 text-sm">
                  Please input valid Email!
                </div>
              )}
            </div>
          </div>

          <Grades setGdMapping={setGdMapping}/>

          <div className="flex">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="accent-gray-500"
                checked={IsActive}
                onChange={(event) =>
                  setIsActive(event.target.checked)
                }
              />
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
              <div className="font-bold text-xs " onClick={() => {addFaculty()}}>Submit</div>
            </div>
          </div>
        </div>
      </div>
    );
  
  return (
    <div>
      <Modal
        open={open || edit != null}
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
            {modalLoader && <ModalLoader /> }
            {!modalLoader && modalContent}
          </div>
        </Box>
      </Modal>
      <div className="flex">
        <div
          className="p-2 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="font-bold text-xs ">+ Add Faculty</div>
        </div>
      </div>
      <div className="mt-5">
        <table className="min-w-full border-collapse border border-gray-200 ">
          <thead className="bg-orange-100">
            <tr>
              {/* <th className="border border-gray-300 p-2 text-left">Photo</th> */}
              <th className="border border-gray-300 p-2 text-left">Name</th>
              {/* <th className="border border-gray-300 p-2 text-left">ID</th> */}
              <th className="border border-gray-300 p-2 text-left">Email</th>
              {/* <th className="border border-gray-300 p-2 text-left">Gender</th> */}

              <th className="border border-gray-300 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((item, index) => (
              <tr key={index} className="odd:bg-gray-50">
                {/* <td className="border border-gray-300 p-2">{item.photo}</td> */}
                <td className="border border-gray-300 p-2">{item.full_name}</td>
                {/* <td className="border border-gray-300 p-2">{item.UserId}</td> */}

                <td className="border border-gray-300 p-2">{item.email}</td>
                {/* <td className="border border-gray-300 p-2">{item.gender}</td> */}

                <td className="border border-gray-300 p-2 space-x-2">
                  <Tooltip title="Edit">
                    <button
                      className="p-2 bg-custom-blue rounded hover:bg-teal-400"
                      onClick={() => {
                        setEdit(item.UserId);
                      }}
                    >
                      <Edit size={16} className="mr-1" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Change Password">
                    <button className="p-2 bg-custom-blue rounded hover:bg-teal-400">
                      <Lock size={16} className="mr-1" />
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
            totalItems={response.count}
            itemsPerPage={response?.items_per_page}
          />
        </div>
      </div>
    </div>
  );
}

export default Faculty;
