import { MenuItem, Select, Tooltip } from "@mui/material";
import {
  ChartLine,
  ClipboardPlus,
  Edit,
  FastForward,
  FileDown,
  Lock,
  Plus,
  Upload,
  User,
} from "lucide-react";
import React, { useState } from "react";

function Student() {
  const [dropdown, setDropdown] = useState("Active Students");
  const [dropdownTwo, setDropdownTwo] = useState(10);

  const handleChange = (value) => {
    setDropdown(value.target.value);
  };

  const handleChangeSecond = (value) => {
    setDropdownTwo(value.target.value);
  };
  const students = [
    {
      photo: <User />,
      name: "A, F, M, T, Z",
      id: "FASFSAFAS",
      grade: "A",
      division: "1",
      gender: "Male",
    }, // First row with an empty input box
    {
      photo: <User />,
      name: "A, Z",
      id: "FASFSAFAS",
      grade: "A",
      division: "1",
      gender: "Male",
    },
    {
      photo: <User />,
      name: "A, Z",
      id: "FASFSAFAS",
      grade: "A",
      division: "1",
      gender: "Male",
    },
    {
      photo: <User />,
      name: "A, Z",
      id: "FASFSAFAS",
      grade: "A",
      division: "1",
      gender: "Male",
    },
    {
      photo: <User />,
      name: "A, Z",
      id: "FASFSAFAS",
      grade: "A",
      division: "1",
      gender: "Male",
    },
    {
      photo: <User />,
      name: "A, Z",
      id: "FASFSAFAS",
      grade: "A",
      division: "1",
      gender: "Male",
    },
    {
      photo: <User />,
      name: "A, Z",
      id: "FASFSAFAS",
      grade: "A",
      division: "1",
      gender: "Male",
    },
  ];
  return (
    <div>
      <div className="flex gap-5 mt-10">
        <div className="py-2 px-4 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer flex">
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
              <th className="border border-gray-300 p-2 text-left">Photo</th>
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">ID</th>
              <th className="border border-gray-300 p-2 text-left">Grade</th>
              <th className="border border-gray-300 p-2 text-left">Division</th>
              <th className="border border-gray-300 p-2 text-left">Gender</th>
              <th className="border border-gray-300 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((item, index) => (
              <tr key={index} className="odd:bg-gray-50">
                <td className="border border-gray-300 p-2">{item.photo}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.id}</td>
                <td className="border border-gray-300 p-2">{item.grade}</td>
                <td className="border border-gray-300 p-2">{item.division}</td>
                <td className="border border-gray-300 p-2">{item.gender}</td>
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
      </div>
    </div>
  );
}

export default Student;
