import React, { useState } from "react";
import {
  Network,
  UserRound,
  UsersRound,
  Settings as Setting,
  Plus,
  Users,
} from "lucide-react";
import Mappings from "./Mappings";
import Faculty from "./Faculty";
import Student from "./Student";
import Settings from "./Settings";

function SchoolDetails() {
  const [selectedTab, setSelectedTab] = useState("mapping");
  const [migrate, setMigrate] = useState(false);
  

  return (
    <div className="w-auto">
      {!migrate && (
        <div>
          <div className="font-bold text-2xl mt-10">School Details</div>

          <div className="flex mt-2">
            <div
              className={`rounded-t-md justify-center flex border-b-2 border-custom-blue ${
                selectedTab == "mapping"
                  ? "bg-custom-orange-dark "
                  : "bg-custom-blue"
              } px-2 py-1 hover:cursor-pointer content-center gap-2`}
              onClick={() => setSelectedTab("mapping")}
            >
              <Network size={20} />
              <span>Mapping</span>
            </div>
            <div
              className={`rounded-t-md justify-center flex border-b-2 border-custom-blue bg-${
                selectedTab == "faculty" ? "custom-orange-dark" : "custom-blue"
              } px-2 py-1 hover:cursor-pointer gap-2`}
              onClick={() => setSelectedTab("faculty")}
            >
              <UserRound size={20} />
              <span>Faculty</span>
            </div>
            <div
              className={`rounded-t-md justify-center flex border-b-2 border-custom-blue bg-${
                selectedTab == "student" ? "custom-orange-dark" : "custom-blue"
              } px-2 py-1 hover:cursor-pointer gap-2`}
              onClick={() => setSelectedTab("student")}
            >
              <UsersRound size={20} />
              <span>Student</span>
            </div>
            <div
              className={`rounded-t-md justify-center flex border-b-2 border-custom-blue bg-${
                selectedTab == "settings" ? "custom-orange-dark" : "custom-blue"
              } px-2 py-1 hover:cursor-pointer gap-2`}
              onClick={() => setSelectedTab("settings")}
            >
              <Setting size={20} />
              <span>Settings</span>
            </div>
          </div>
        </div>
      )}
      {selectedTab == "mapping" && (
        <Mappings migrate={migrate} setMigrate={setMigrate} />
      )}
      {selectedTab == "faculty" && <Faculty />}
      {selectedTab == "student" && <Student />}
      {selectedTab == "settings" && <Settings />}
    </div>
  );
}

export default SchoolDetails;
