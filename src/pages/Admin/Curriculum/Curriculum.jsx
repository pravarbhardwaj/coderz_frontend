import { FolderCheck, FolderPlus } from "lucide-react";
import React, { useState } from "react";
import AssignProject from "./AssignProject";
import AssignedProject from "./AssignedProject";
import SessionPage from "./SessionPage";
import Project from "../../../pages/Teacher/Project";

function Curriculum() {
  const [selectedTab, setSelectedTab] = useState("assign-project");
  const [session, setSession] = useState(false);
  const [sessionName, setSessionName] = useState();

  const CurriculumContent = () => {
    return (
      <div>
        <div className="font-bold text-2xl mt-10">Curriculum</div>

        <div className="flex mt-2">
          <div
            className={`rounded-t-md justify-center flex border-b-2 border-custom-blue ${
              selectedTab == "assign-project"
                ? "bg-custom-orange-dark "
                : "bg-custom-blue"
            } px-2 py-1 hover:cursor-pointer content-center gap-2`}
            onClick={() => setSelectedTab("assign-project")}
          >
            <FolderPlus size={20} />
            <span>Assign Project</span>
          </div>
          <div
            className={`rounded-t-md justify-center flex border-b-2 border-custom-blue bg-${
              selectedTab == "assigned-project"
                ? "custom-orange-dark"
                : "custom-blue"
            } px-2 py-1 hover:cursor-pointer gap-2`}
            onClick={() => setSelectedTab("assigned-project")}
          >
            <FolderCheck size={20} />
            <span>Assigned Project</span>
          </div>
        </div>
        <div className="border border-grey"></div>
        {selectedTab == "assign-project" && <AssignProject />}
        {/* {selectedTab == "assigned-project" && (
          <AssignedProject
            setSession={setSession}
            setSessionName={setSessionName}
          />
        )} */}
        {selectedTab == "assigned-project" && (
          <Project
            myProject={false}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      {!session && <CurriculumContent />}
      {session && (
        <SessionPage setSession={setSession} renderSession={sessionName} />
      )}
    </div>
  );
}

export default Curriculum;
