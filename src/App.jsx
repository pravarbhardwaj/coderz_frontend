// @ts-ignore
import {
  Layers,
  Book,
  School,
  NotebookPen,
  LogOut,
  ListCheck,
  Shapes,
  BookOpenText,
  LayoutDashboard,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import * as React from "react";

import axiosConfig from "./request/request";
import SchoolDetails from "./pages/Admin/SchoolDetails/SchoolDetails";
import Login from "./pages/Login/Login";
import LoginSSO from "./pages/Login/LoginSSO";
import ProjectReview from "./pages/Teacher/ProjectReview/ProjectReview";
import Project from "./pages/Teacher/Project";
import Content from "./pages/Content";
import QuizApp from "./components/QuizApp";
import QuizResults from "./components/QuizResults";
import StudentLogin from "./pages/Student/StudentLogin";
import Learn from "./pages/Student/Learn";
import Quizzes from "./pages/Student/Quizzes";
import Practice from "./pages/Student/Practice";
import Dashbaord from "./pages/Teacher/Dashboard";

function App() {
  const role = localStorage.getItem("role");
  const [userRole, setUserRole] = React.useState(localStorage.getItem("role"));

  React.useEffect(() => {
    fetch("/version.json")
      .then((res) => {
        if (!res.ok) throw new Error("version.json not found");
        return res.json();
      })
      .then(({ version }) => {
        const currentVersion = localStorage.getItem("app-version");
        if (currentVersion && currentVersion !== version) {
          localStorage.clear();
          sessionStorage.clear();
          caches
            .keys()
            .then((names) => names.forEach((name) => caches.delete(name)));
          localStorage.setItem("app-version", version);
          window.location.reload();
        } else {
          localStorage.setItem("app-version", version);
        }
      })
      .catch((err) => {
        console.error("Error fetching version:", err);
      });
  }, []);

  const PrivateWrapper = () => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const user_id = localStorage.getItem("user_id");
    return access && refresh && role && user_id ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  };

  const SideBar = ({ element }) => {
    let sideBarItems = [];

    return (
      <div className="flex">
        <div className="sticky top-0 h-full">
          <Sidebar>
            {userRole == "Learner" && (
              <>
                <SidebarItem icon={<Layers size={20} />} text="Projects" />
                <SidebarItem icon={<Book size={20} />} text="Learn" />
                <SidebarItem icon={<BookOpenText size={20} />} text="Quizzes" />
                <SidebarItem icon={<NotebookPen size={20} />} text="Practice" />

                <hr className="my-3" />

                <div className="flex h-full">
                  <div className="mt-auto">
                    <SidebarItem icon={<LogOut size={20} />} text="Logout" />
                  </div>
                </div>
              </>
            )}

            {userRole == "Teacher" && (
              <>

                <SidebarItem icon={<Book size={20} />} text="Teach Content" />

                <SidebarItem icon={<Shapes size={20} />} text="Projects" />
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />


                <SidebarItem
                  icon={<ListCheck size={20} />}
                  text="Project Review"
                />

                <hr className="my-3" />

                <div className="flex h-full">
                  <div className="mt-auto">
                    <SidebarItem icon={<LogOut size={20} />} text="Logout" />
                  </div>
                </div>
              </>
            )}

            {userRole == "Admin" && (
              <>
                <SidebarItem icon={<Layers size={20} />} text="Projects" />

                <SidebarItem
                  icon={<School size={20} />}
                  text="School Details"
                />

                <hr className="my-3" />

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
          <div className="flex mb-5">
            <div>
              <div className="font-bold text-3xl">{userRole} Portal</div>
              <div>
                Welcome Back{" "}
                <span className="font-semibold">
                  {localStorage.getItem("name")}
                </span>
              </div>
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

        <Route
          path="/student-login/:id/:key"
          element={<StudentLogin setUserRole={setUserRole} />}
        />

        {!userRole || !["Learner", "Teacher", "Admin"].includes(userRole) ? (
          <Route element={<Login setUserRole={setUserRole} />} path="*" />
        ) : (
          <Route element={<h1>Page Not Found!</h1>} path="*" />
        )}
        {role == "Learner" && (
          <>
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Project myProject={false} />} />
                  <PrivateWrapper />
                </div>
              }
              path="/"
            />
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Content />} />
                  <PrivateWrapper />
                </div>
              }
              path="/content"
            />
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Learn />} />
                  <PrivateWrapper />
                </div>
              }
              path="/learn"
            />
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Quizzes />} />
                  <PrivateWrapper />
                </div>
              }
              path="/quizzes"
            />
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Practice />} />
                  <PrivateWrapper />
                </div>
              }
              path="/practice"
            />
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <QuizApp />
                  <PrivateWrapper />
                </div>
              }
              path="/quizapp/:id"
            />
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <QuizResults />
                  <PrivateWrapper />
                </div>
              }
              path="/quiz-result/:id"
            />
          </>
        )}
        {role == "Admin" && (
          <>
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Project myProject={false} />} />
                  <PrivateWrapper />
                </div>
              }
              path="/"
            />

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
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<ProjectReview />} />
                  <PrivateWrapper />
                </div>
              }
              path="/projectreview"
            />
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Dashbaord />} />
                  <PrivateWrapper />
                </div>
              }
              path="/dashboard"
            />
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Content />} />
                  <PrivateWrapper />
                </div>
              }
              path="/teachcontent"
            />
            <Route
              element={
                <div>
                  <PrivateWrapper />
                  <SideBar element={<Project myProject={false} />} />
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
