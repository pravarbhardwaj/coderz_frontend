import React, { useRef, useState } from "react";
import { CircleX, Edit, Lock, Plus, User, Users } from "lucide-react";
import { Box, Modal, TextField, Tooltip } from "@mui/material";

function Faculty() {
  const faculty = [
    { photo: <User />, name: "A, F, M, T, Z", id: "FASFSAFAS", gender: "Male" }, // First row with an empty input box
    { photo: <User />, name: "A, Z", id: "FASFSAFAS", gender: "Male" },
    { photo: <User />, name: "A, Z", id: "FASFSAFAS", gender: "Male" },
    { photo: <User />, name: "A, Z", id: "FASFSAFAS", gender: "Male" },
    { photo: <User />, name: "A, Z", id: "FASFSAFAS", gender: "Male" },
    { photo: <User />, name: "A, Z", id: "FASFSAFAS", gender: "Male" },
    { photo: <User />, name: "A, Z", id: "FASFSAFAS", gender: "Male" },
  ];

  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
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
              <div className="flex items-center">
                Some Picture
              </div>
             <div>
              <div className="flex gap-4">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  className="w-full"
                />
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  className="w-full"
                />
              </div>
              <div className="flex gap-4 mt-3">
              <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  className="w-full"
                />
                 <TextField
                  id="outlined-basic"
                  label="Contact"
                  variant="outlined"
                  className="w-full"
                />
                 <TextField
                  id="outlined-basic"
                  label="Alternative Contact"
                  variant="outlined"
                  className="w-full"
                />
              </div>
              <div className="flex gap-4 mt-3">
              <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="w-full"
                />
                </div>
                </div>
            </div>
            <div className="mt-3 ">

              <div>

              </div>
            </div>
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
              <th className="border border-gray-300 p-2 text-left">Photo</th>
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">ID</th>
              <th className="border border-gray-300 p-2 text-left">Gender</th>
              <th className="border border-gray-300 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((item, index) => (
              <tr key={index} className="odd:bg-gray-50">
                <td className="border border-gray-300 p-2">{item.photo}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.id}</td>
                <td className="border border-gray-300 p-2">{item.gender}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <Tooltip title="Edit">
                    <button className="p-2 bg-teal-200 rounded hover:bg-teal-300">
                      <Edit size={16} className="mr-1" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Change Password">
                    <button className="p-2 bg-teal-200 rounded hover:bg-teal-300">
                      <Lock size={16} className="mr-1" />
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

export default Faculty;
