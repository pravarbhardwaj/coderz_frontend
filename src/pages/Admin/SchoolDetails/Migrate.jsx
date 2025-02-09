import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { MoveLeft } from "lucide-react";
import React, { useState } from "react";

function Migrate({ setMigrate }) {
  const [dateOne, setDateOne] = useState("2023-24");
  const [datesOne, setDatesOne] = useState(["2023-24"]);
  return (
    <div className="mt-10">
      <div className="flex gap-5 items-center">
        <div onClick={() => setMigrate(false)} className="cursor-pointer">
          <MoveLeft />
        </div>
        <div className="font-bold text-2xl">Migrate</div>
      </div>
      <div className="flex mt-5 gap-10">
        <div className="w-full border-2 rounded-md">
          <div className="flex gap-10 bg-custom-orange-light items-center p-2">
            <div className="font-semibold text-l">ACADEMIC YEAR</div>
            <div>
              <Select
                value={dateOne}
                size="small"
                onChange={(value) => setDateOne(value.target.value)}
                className="w-40 bg-white"
              >
                {datesOne.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="px-5 mt-2">
            <div className="grid grid-cols-[10%_40%_40_10%]">
              <div className="font-semibold text-lg">From:</div>
              <div>
                <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select Grade
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={"1"}
                    label="Select Grade"
                    // onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select Division
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Select Division"
                    // onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="bg-custom-orange-light px-3 rounded-md font-semibold ml-auto">
                0
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">2</div>
      </div>
    </div>
  );
}

export default Migrate;
