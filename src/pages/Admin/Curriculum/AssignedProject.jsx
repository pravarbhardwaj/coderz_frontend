import React from "react";

const projects = [
  {
    title: "Greetings",
    tool: "Scratch",
    description: "This project focuses on discovering the importance of environment and..",
    session: 1,
    type: "Optional",
    image: "scratch.png",
  },
  {
    title: "My Project",
    tool: "HTML/CSS - VS Code",
    description: "The goal of this project is to create a dynamic website for a personal project...",
    session: 2,
    type: "Optional",
    image: "web-dev.png",
  },
  {
    title: "My Project",
    tool: "HTML/CSS - VS Code",
    description: "The goal of this project is to create a dynamic website for a personal project.",
    session: 2,
    type: "Optional",
    image: "web-dev.png",
  },
  {
    title: "My Project",
    tool: "HTML/CSS - VS Code",
    description: "The goal of this project is to create a dynamic website for a personal project.",
    session: 2,
    type: "Optional",
    image: "web-dev.png",
  },
];

const handleSession = (setSession, sessionName, setRenderSession) => 
{

  setSession(true)
  setRenderSession(sessionName)
}

const ProjectCard = ({ project, setSession, setSessionName }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition-all">
      <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-3">{project.title}</h3>
      <p className="text-sm text-gray-500">Tool: {project.tool}</p>
      <p className="text-gray-700 mt-2 text-sm">{project.description}</p>
      <p className="text-sm mt-2">
        <span className="font-semibold">Session:</span> {project.session} | <span className="font-semibold">Type:</span> {project.type}
      </p>
      <button className="bg-blue-500 text-white mt-3 py-2 px-4 rounded-md w-full hover:bg-blue-600 transition-all" onClick={() => handleSession(setSession, project.title, setSessionName)}>
        Go To Session
      </button>
    </div>
  );
};

const AssignedProject = ({setSession, setSessionName}) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} setSession={setSession} setSessionName={setSessionName} />
        ))}
      </div>
    </div>
  );
};

export default AssignedProject;
