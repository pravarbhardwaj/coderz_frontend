import React from "react";
import { Edit, Lock, Plus, User, Users } from "lucide-react";
import { Tooltip } from "@mui/material";

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
  return (
    <div>
      <div className="flex">
        <div className="p-2 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer">
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
                  <td className="border border-gray-300 p-2">
                    {item.photo}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.id}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.gender}
                  </td>
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
