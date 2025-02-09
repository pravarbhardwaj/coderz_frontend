import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Copy, Eye, EyeOff, Image, RotateCw, Upload } from "lucide-react";
import React, { useState } from "react";

function Settings() {
  const [grade, setGrade] = useState(["All"]);
  const grades = ["All", "1st", "2nd", "3rd", "4th"];
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGrade = (event) => {
    const {
      target: { value },
    } = event;
    setGrade(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <div>
      <div className="w-1/2">
        <div className="text-2xl font-bold mt-4">Profile Settings</div>
        <div className="flex items-center mt-2">
          <div>Allow view profile for students</div>
          <Switch className="ml-auto" />
        </div>
        <div className="flex items-center mt-2">
          <div>Allow view profile for faculties</div>
          <Switch className="ml-auto" />
        </div>
        <div className="flex items-center mt-2">
          <div>Allow profile picture update for student</div>
          <Switch className="ml-auto" />
        </div>
        <div className="flex items-center mt-2">
          <div>Allow profile picture update for faculty</div>
          <Switch className="ml-auto" />
        </div>

        <div className="text-2xl font-bold mt-4">Password Settings</div>
        <div className="flex items-center mt-2">
          <div>Allow Copy/Paste URL for Students</div>
          <Switch className="ml-auto" />
        </div>
        <div className="flex items-center mt-2">
          <div>Allow password changes for student</div>
          <Switch className="ml-auto" />
        </div>
        <div className="flex items-center mt-2">
          <div>Allow password changes for faculty</div>
          <Switch className="ml-auto" />
        </div>
        <div className="flex items-center mt-2">
          <div>Student password visible for faculty and admin</div>
          <Switch className="ml-auto" />
        </div>
        <div className="flex items-center mt-2">
          <div>Faculty password visible for admin</div>
          <Switch className="ml-auto" />
        </div>
        <div className="p-2 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer flex">
          <div className="font-bold text-xs ">Save</div>
        </div>
        <div className="border-b-2 mt-2"></div>
        <div className="text-2xl font-bold mt-4">
          Reset Password For All Students
        </div>
        <div className="mt-2">Reset as username</div>
        <div className="mt-4 flex items-center">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Grade</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={grade}
              onChange={handleGrade}
              input={<OutlinedInput label="Grade" />}
              renderValue={(selected) => selected.join(", ")}
              //   MenuProps={MenuProps}
              className="w-60"
            >
              {grades.map((g) => (
                <MenuItem key={g} value={g}>
                  <Checkbox checked={grade.includes(g)} />
                  <ListItemText primary={g} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="p-2 border-b-2 rounded-md items-center justify-center mt-2 bg-custom-blue hover:cursor-pointer flex ml-auto">
            <div className="font-bold text-xs flex items-center gap-2">
              <RotateCw size={12} /> Save
            </div>
          </div>
        </div>
        <div className="border-b-2 mt-2"></div>
        <div className="mt-2">Reset as common password</div>
        <div className="flex items-center">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Grade</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={grade}
              onChange={handleGrade}
              input={<OutlinedInput label="Grade" />}
              renderValue={(selected) => selected.join(", ")}
              //   MenuProps={MenuProps}
              className="w-60"
            >
              {grades.map((g) => (
                <MenuItem key={g} value={g}>
                  <Checkbox checked={grade.includes(g)} />
                  <ListItemText primary={g} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            //   id="outlined-required"
            label="Type your password"
            defaultValue=""
          />
          <div className="p-2 border-b-2 rounded-md items-center justify-center bg-custom-blue hover:cursor-pointer flex ml-2">
            <div className="font-bold text-xs flex items-center">Save</div>
          </div>
        </div>
        <div className="flex items-center gap-12 mt-6">
          <div>API KEY</div>
          <div className="relative w-4/5">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              <Copy size={20} className="ml-2" />
            </button>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <div>Document</div>
          <div className="ml-8 rounded-md p-2 bg-blue-500 text-white">
            Click on this link
          </div>
        </div>
        <div className="border-2 rounded-md w-1/2 flex">
            <div className="flex-col justify-center items-center"><div>Upload School Logo</div> <div><Image/></div></div>

            <div className="p-2 border-b-2 rounded-md items-center justify-center bg-custom-blue hover:cursor-pointer flex ml-2">
            <div className="font-bold text-xs flex items-center"><Upload size={20}/> Upload</div>
          </div>
        </div>
        
      </div>

    </div>
  );
}

export default Settings;
