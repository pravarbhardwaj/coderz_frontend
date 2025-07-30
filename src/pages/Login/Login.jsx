import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserDetails, loginApi } from "../../request/APIManager";

const Login = ({ setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await loginApi(email, password, setUserRole);
    if (response) {
      setLoginError(false);
  
      const quest = await getCurrentUserDetails();
      if (!quest) {
        setLoginError(true);
        return;
      }
  
      // ✅ Store login time for tracking
      const loginTime = new Date().toISOString();
      localStorage.setItem("loginTime", loginTime);
  
      // Optional: clean up any lingering tab sessions (if needed)
      const sessionKey = "activeTabs";
      const tabList = JSON.parse(localStorage.getItem(sessionKey) || "[]");
      const cleanedTabList = [...new Set(tabList)]; // remove dupes
      localStorage.setItem(sessionKey, JSON.stringify(cleanedTabList));
  
      // ✅ Redirect
      navigate("/");
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginError && (
            <div className="text-red-500 text-sm text-center">
              Invalid email or password.
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
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
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
