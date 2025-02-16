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
} from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import Home from "./pages/Student/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import * as React from "react";
import ClassroomProject from "./pages/Student/ClassroomProject/ClassroomProject";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Schedule from "./pages/Admin/Schedule";
import SchoolDetails from "./pages/Admin/SchoolDetails/SchoolDetails";
import Login from "./pages/Login";
import Curriculum from "./pages/Admin/Curriculum/Curriculum";
import MyProjects from "./pages/Student/MyProjects/MyProjects";

function App() {
  const role = "student";

  if (role == "a") {
    return (
      <div>
        <Login />
      </div>
    );
  }

  if (role == "student") {
    return (
      <BrowserRouter>
        <div className="flex">
          <div className="flex">
            <Sidebar>
              <SidebarItem icon={<HomeIcon size={20} />} text="Dashboard" />
              <SidebarItem icon={<Book size={20} />} text="Digital Book" />
              <SidebarItem
                icon={<School size={20} />}
                text="Classroom Project"
              />
              <SidebarItem
                icon={<StickyNote size={20} />}
                text="Personalised Project"
              />
              <SidebarItem icon={<Layers size={20} />} text="My Projects" />
              <SidebarItem icon={<Brain size={20} />} text="Reflective" />
              <SidebarItem icon={<NotebookPen size={20} />} text="Assessment" />
              <SidebarItem icon={<Trophy size={20} />} text="Competition" />
              <SidebarItem icon={<ChartLine size={20} />} text="Report" />
              <SidebarItem
                icon={<MonitorPlay size={20} />}
                text="Platform Videos"
              />

              <hr className="my-3" />
              <SidebarItem icon={<Settings size={20} />} text="Notifications" />
            </Sidebar>
          </div>
          <div className="w-full py-5 px-10">
            <div className="flex">
              <div>
                <div className="font-bold text-xl">SESL-US GLOBAL SCHOOL</div>
                <div>Welcome Back User</div>
              </div>
              {/* <div className="ml-auto"><SearchBar /></div> */}
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mycourse" element={<ClassroomProject />} />
              <Route path="/myprojects" element={<MyProjects />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  if (role == "admin") {
    return (
      <BrowserRouter>
        <div className="flex">
          <div className="flex">
            <Sidebar>
              <SidebarItem icon={<HomeIcon size={20} />} text="Dashboard" />
              <SidebarItem icon={<Book size={20} />} text="Schedule" />
              <SidebarItem icon={<School size={20} />} text="School Details" />
              <SidebarItem icon={<StickyNote size={20} />} text="Curriculum" />
              <SidebarItem icon={<Brain size={20} />} text="Reflective" />
              <SidebarItem icon={<NotebookPen size={20} />} text="Assessment" />
              <SidebarItem icon={<Trophy size={20} />} text="Competition" />
              <SidebarItem
                icon={<MonitorPlay size={20} />}
                text="Platform Videos"
              />

              <hr className="my-3" />
              <SidebarItem icon={<Settings size={20} />} text="Notifications" />
            </Sidebar>
          </div>
          <div className="w-full py-5 px-10">
            <div className="flex">
              <div>
                <div className="font-bold text-xl">SESL-US GLOBAL SCHOOL</div>
                <div>Welcome Back User</div>
              </div>
              {/* <div className="ml-auto"><SearchBar /></div> */}
            </div>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/mycourse" element={<ClassroomProject />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/schooldetails" element={<SchoolDetails />} />
              <Route path="/curriculum" element={<Curriculum />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
