import {
  LayoutDashboard,
  HomeIcon,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
  Book,
  School,
  Brain,
  NotebookPen,
  Trophy,
  ChartLine,
  MonitorPlay,
  LogIn,
  LogOut,
  ListCheck,
  Upload,
  Shapes,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import Home from "./pages/Student/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import * as React from "react";
import ClassroomProject from "./pages/Student/ClassroomProject/ClassroomProject";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Schedule from "./pages/Admin/Schedule";
import SchoolDetails from "./pages/Admin/SchoolDetails/SchoolDetails";
import Login from "./pages/Login/Login";
import Curriculum from "./pages/Admin/Curriculum/Curriculum";
import MyProjects from "./pages/Student/MyProjects/MyProjects";
import LoginSSO from "./pages/Login/LoginSSO";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import ProjectReview from "./pages/Teacher/ProjectReview/ProjectReview";
import Project from "./pages/Teacher/Project";

function App() {
  const role = localStorage.getItem("role");
  const [userRole, setUserRole] = React.useState(localStorage.getItem("role"));

  const PrivateWrapper = () => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    // return access && refresh && role ? <Outlet /> : <Navigate to="/login" />;
  };

  const SideBar = ({ element }) => {
    const role = localStorage.getItem("role");

    let sideBarItems = [];

    return (
      <div className="flex">
        <div className="sticky top-0 h-full">
          <Sidebar>
            {role == "Learner" && (
              <>
                {/* <SidebarItem icon={<HomeIcon size={20} />} text="Dashboard" /> */}
                {/* <SidebarItem icon={<Book size={20} />} text="Digital Book" /> */}
                {/* <SidebarItem
                  icon={<School size={20} />}
                  text="Classroom Project"
                /> */}
                {/* <SidebarItem
                  icon={<StickyNote size={20} />}
                  text="Personalised Project"
                /> */}
                <SidebarItem icon={<Layers size={20} />} text="Projects" />
                {/* <SidebarItem icon={<Brain size={20} />} text="Reflective" /> */}
                {/* <SidebarItem
                  icon={<NotebookPen size={20} />}
                  text="Assessment"
                /> */}
                {/* <SidebarItem icon={<Trophy size={20} />} text="Competition" /> */}
                {/* <SidebarItem icon={<ChartLine size={20} />} text="Report" /> */}
                {/* <SidebarItem
                  icon={<MonitorPlay size={20} />}
                  text="Platform Videos"
                /> */}

                <hr className="my-3" />
                {/* <SidebarItem
                  icon={<Settings size={20} />}
                  text="Notifications"
                /> */}
                <div className="flex h-full">
                  <div className="mt-auto">
                    <SidebarItem icon={<LogOut size={20} />} text="Logout" />
                  </div>
                </div>
              </>
            )}

            {role == "Teacher" && (
              <>
               <SidebarItem
                  icon={<Shapes size={20} />}
                  text="Projects"
                />
                {/* <SidebarItem icon={<HomeIcon size={20} />} text="Dashboard" /> */}
                <SidebarItem
                  icon={<ListCheck size={20} />}
                  text="Project Review"
                />

                {/* <SidebarItem
                  icon={<Shapes size={20} />}
                  text="My Class"
                /> */}

                <hr className="my-3" />
                {/* <SidebarItem
                  icon={<Settings size={20} />}
                  text="Notifications"
                /> */}
                <div className="flex h-full">
                  <div className="mt-auto">
                    <SidebarItem icon={<LogOut size={20} />} text="Logout" />
                  </div>
                </div>
              </>
            
            )}

            {role == "Admin" && (
              <>
                <SidebarItem icon={<Layers size={20} />} text="Projects" />

                {/* <SidebarItem icon={<HomeIcon size={20} />} text="Dashboard" /> */}
                {/* <SidebarItem icon={<Book size={20} />} text="Schedule" /> */}
                <SidebarItem
                  icon={<School size={20} />}
                  text="School Details"
                />
                {/* <SidebarItem
                  icon={<StickyNote size={20} />}
                  text="Curriculum"
                /> */}
                {/* <SidebarItem icon={<Brain size={20} />} text="Reflective" /> */}
                {/* <SidebarItem
                  icon={<NotebookPen size={20} />}
                  text="Assessment"
                /> */}
                {/* <SidebarItem icon={<Trophy size={20} />} text="Competition" /> */}
                {/* <SidebarItem
                  icon={<MonitorPlay size={20} />}
                  text="Platform Videos"
                /> */}

                <hr className="my-3" />
                {/* <SidebarItem
                  icon={<Settings size={20} />}
                  text="Notifications"
                /> */}
                <div className="flex h-full">
                  <div className="mt-auto">
                    <SidebarItem icon={<LogOut size={20} />} text="Logout" />
                  </div>
                </div>
              </>
             )} 
          </Sidebar>
        </div>
        <div className="w-full py-5 px-10 overflow-y-auto h-full">
          <div className="flex">
            <div>
              <div className="font-bold text-xl">SESL-US GLOBAL SCHOOL</div>
              <div>Welcome Back User</div>
            </div>
            {/* <div className="ml-auto"><SearchBar /></div> */}
          </div>
          {element}
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login setUserRole={setUserRole} />} path="/login" />
        <Route element={<LoginSSO />} path="/loginsso" />

        {!userRole || !["Learner", "Teacher", "Admin"].includes(userRole) ? (
          <Route element={<Login setUserRole={setUserRole} />} path="*" />
        ) : (
          <Route element={<h1>Page Not Found!</h1>} path="*" />
        )}
        {role == "Learner" && (
          <>
            {/* <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Home />} />
                  <PrivateWrapper />
                </div>
              }
              path="/"
            /> */}
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Project />} />
                  <PrivateWrapper />
                </div>
              }
              path="/"
            />
            {/* <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Project myProject={true} />} />
                  <PrivateWrapper />
                </div>
              }
              path="/myprojects"
            /> */}
          </>
        )}
        {role == "Admin" && (
          <>
            {/* <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<AdminDashboard />} />
                  <PrivateWrapper />
                </div>
              }
              path="/"
            /> */}
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<ClassroomProject />} />
                  <PrivateWrapper />
                </div>
              }
              path="/"
            />
            {/* <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Schedule />} />
                  <PrivateWrapper />
                </div>
              }
              path="/schedule"
            /> */}
            {/* <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Curriculum />} />
                  <PrivateWrapper />
                </div>
              }
              path="/curriculum"
            /> */}
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<SchoolDetails />} />
                  <PrivateWrapper />
                </div>
              }
              path="/schooldetails"
            />
          </>
        )}

        {role == "Teacher" && (
          <>
            {/* <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<TeacherDashboard />} />
                  <PrivateWrapper />
                </div>
              }
              path="/"
            /> */}
            {/* <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<ProjectReview />} />
                  <PrivateWrapper />
                </div>
              }
              path="/projectreview"
            /> */}
            <Route
            element={
              <div>
                <PrivateWrapper />
                <SideBar element={<Project />} />
                <PrivateWrapper />
              </div>
            }
            path="/"
          />
          </>
        )}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
