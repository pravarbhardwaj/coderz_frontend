import axios from "axios";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// @ts-ignore
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <aside className="z-10 flex h-screen sticky top-0 ">
        <nav className="flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 flex-1 "
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>
        </nav>
      </aside>
    </>
  );
}

const activeMapper = {
  Projects: "/",
  Content: "/content",
  Learn: "/learn",
  Quizzes: "/quizzes",
  Practice: "/practice",
  'Teach Content': "/teachcontent",

  "School Details": "/schooldetails",

  "Project Review": "/projectreview",
  "Coding Playground": "/coding-playground",

  Dashboard: "/dashboard"
};

const handleLogout = async (navigate) => {
  const loginTime = localStorage.getItem("loginTime");
  const logoutTime = new Date().toISOString();

  if (loginTime) {
    const payload = {
      UserId: localStorage.getItem("user_id"),
      login_time: loginTime,
      logout_time: logoutTime,
    };

    try {
      await axios.post(
        "https://coding1.questplus.in/api/v1/accounts/log-session/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to log session:", error);
    }
  }

  localStorage.clear(); 

  navigate("/login");
};

export function SidebarItem({ icon, text }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        location.pathname == activeMapper[text]
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
      onClick={() => {
        if (text == "Logout") {
          handleLogout(navigate);
          return;
        }
        navigate(activeMapper[text]);
      }}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
