import ClassroomCard from "../../../components/ClassroomCard";
import React, { useState } from "react";
import ProjectPage from "./ProjectPage";

function ClassroomProject() {
  const [project, setProject] = useState(false);
  const [projectId, setProjectId] = useState();
  const data = [
    {
      id: 1,
      title: "Odd-Even Number",
      image_url: "some_url",
      status: "Pending",
      module: "NA",
      tool: "Python - VS Code",
      total_session: 1,
      session_shared: 1,
      total_reflectives: 2,
      reflectives: 1,
    },
    {
      id: 2,
      title: "Odd-Even Number",
      image_url: "some_url",
      status: "Pending",
      module: "NA",
      tool: "Python - VS Code",
      total_session: 1,
      session_shared: 2,
      total_reflectives: 2,
      reflectives: 2,
    },
  ];

  const ClassroomContent = () => {
    return (
      <div className="mt-5">
      <div className="text-xl font-bold">Classroom Project</div>
      <div className="grid grid-cols-12 gap-4 mt-5">
        {data.map((item) => (
          <div className="col-span-12 md:col-span-4" key={item.id}>
            <ClassroomCard data={item} setProject={setProject} setProjectId={setProjectId} />
          </div>
        ))}
      </div>
    </div>
    )
  }
  return (
    <div>
      {!project && <ClassroomContent />}
     {project && <ProjectPage setProject={setProject} projectId={projectId}/>}
    </div>
  );
}

export default ClassroomProject;
