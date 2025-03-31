import React, { useEffect, useState } from "react";
import { CircleX, Cross, Delete, Plus, Trash, Users } from "lucide-react";
import { Box, Modal, TextField, Tooltip, Typography } from "@mui/material";
import Migrate from "./Migrate";
import { getAPI, putAPI } from "../../../request/APIManager";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

const Mappings = ({ migrate, setMigrate }) => {
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [addDivisionData, setAddDivision] = useState();
  const [modalLoader, setModalLoader] = useState(false);
  const [divisions, setDivisions] = useState([]);

  const fetchData = async () => {
    const response = await getAPI(
      navigation,
      "accounts/admin/grade-division-mapping/"
    );
    setGrades([...response]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    setModalLoader(true);
    if (divisions.includes("")) {
      alert("Please fill all divisions input");
      return;
    }
    const response = await putAPI(
      navigation,
      `accounts/admin/single-grade-division/${addDivisionData["class"]}/`,
      { divisions: divisions }
    );
    await fetchData();
    setAddDivision(null);
    setOpen(false);
    setModalLoader(false);
  };

  const deleteDivision = (index) => {
    divisions.splice(index, 1);
    setDivisions([...divisions]);
  };

  const addDivision = () => {
    divisions.push("");
    setDivisions([...divisions]);
  };

  const handleChange = (index, value) => {
    divisions[index] = value;
    setDivisions([...divisions]);
  };

  const fetchSingleGrade = async () => {
    setModalLoader(true);
    const response = await getAPI(
      navigation,
      `accounts/admin/single-grade-division/${addDivisionData["class"]}/`
    );
    setDivisions([...response.divisions]);
    setModalLoader(false);
  };

  const ModalLoader = () => {
    return (
      <div className="flex h-full items-center justify-center mt-10">
        <Circles />
      </div>
    );
  };

  const ModalContent = () => {
    return (
      <div>
        <div className="text-center px-60">
          <div className="font-semibold text-2xl">Add Division</div>
          <div className="font-semibold">1st</div>
        </div>
        <div className="border-b-2 mt-5" />
        <div className="flex">
          <div
            className="p-2 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer"
            onClick={addDivision}
          >
            <div className="font-bold text-xs flex items-center gap-1">
              <Plus size={20} /> Add
            </div>
          </div>
        </div>
        <div className="mt-5">
          {divisions.map((item, index) => (
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, height: 60 } }}
            >
              <div className="flex items-center gap-2">
                <TextField
                  className="w-full"
                  id="outlined-basic"
                  label="Division Name"
                  variant="outlined"
                  value={divisions[index]}
                  onChange={(value) => {
                    handleChange(index, value.target.value);
                  }}
                />
                <div
                  className="ml-auto text-red-400 cursor-pointer"
                  onClick={() => deleteDivision(index)}
                >
                  <Trash size={20} />
                </div>
              </div>
            </Box>
          ))}
          <div className="flex justify-center" onClick={handleSubmit}>
            <div className="p-2 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer">
              <div className="font-bold text-xs flex items-center gap-1">
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!addDivisionData) {
      return;
    }

    fetchSingleGrade();
  }, [addDivisionData]);

  if (migrate) {
    return <Migrate setMigrate={setMigrate} />;
  }

  return (
    <div className="mt-5">
      <Modal
        open={open}
        onClose={() => {
          setAddDivision(null);
          setOpen(false);
        }}
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

            {modalLoader ? <ModalLoader /> : <ModalContent />}
          </div>
        </Box>
      </Modal>
      <table className="min-w-full border-collapse border border-gray-200 ">
        <thead className="bg-orange-100">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Grade</th>
            <th className="border border-gray-300 p-2 text-left">Division</th>
            <th className="border border-gray-300 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((item, index) => (
            <tr key={index} className="odd:bg-gray-50">
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  disabled={true}
                  defaultValue={item.grade}
                  placeholder="Enter grade"
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">{item.divisions}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <Tooltip title={"Add Division"}>
                  <button
                    className="p-2 bg-teal-200 rounded hover:bg-teal-300"
                    onClick={() => {
                      setAddDivision(item);
                      setOpen(true);
                    }}
                  >
                    <Plus size={16} className="mr-1" />
                  </button>
                </Tooltip>
                <Tooltip title={"Migrate Student"}>
                  <button
                    className="p-2 bg-teal-200 rounded hover:bg-teal-300"
                    onClick={() => setMigrate(true)}
                  >
                    <Users size={16} className="mr-1" />
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mappings;
