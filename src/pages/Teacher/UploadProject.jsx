import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";

function UploadProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [division, setDivision] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  // const [preview, setPreview] = ();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      // setPreview(URL.createObjectURL(selectedFile)); // Generate preview
    } else {
      alert("Please select a valid image file.");
    }
  };

  return (
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
      <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg shadow-md">
      {/* {preview && (
        <img
          src={preview}
          alt="Thumbnail Preview"
          className="w-32 h-32 object-cover rounded-md"
        />
      )} */}
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Select Thumbnail
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </label>
    </div>
    </div>
  );
}

export default UploadProject;
