import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setLoading, setError, clearError, setIsAuthenticated } from "../store/appSlice";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error, user } = useSelector((state) => state.app);

  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      if (!user?.userType) {
        navigate("/selectUserType");
      } else if (user.userType === "Survivor") {
        navigate("/survivorDashboard");
      } else if (user.userType === "NGO") {
        navigate("/ngoDashboard");
      }
    }
  }, [isAuthenticated, navigate, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      dispatch(setError('Email and password are required'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearError());
    
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/login", {
        email: formData.email,
        password: formData.password,
      },{
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      dispatch(setUser(response.data.user));
      dispatch(setIsAuthenticated(true));
      if (!response.data.user.userType) {
        navigate("/selectUserType");
      } else if (response.data.user.userType === "Survivor") {
        navigate("/survivorDashboard");
      } else if (response.data.user.userType === "NGO") {
        navigate("/ngoDashboard");
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && (
          <p className="text-blue-500 text-center mb-4">Loading...</p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="example@email.com"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all mb-3"
        >
          Login
        </button>

        {/* OR Divider */}
        <div className="relative text-center my-4">
          <span className="text-xs font-medium text-gray-500 bg-white px-2">
            OR
          </span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-white text-gray-700 py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all"
        >
          <FaGoogle className="inline-block mr-2" />
          <p>Sign up with Google</p>
        </button>

        {/* Bottom link */}
        <div className="text-center mt-4">
          <span className="text-xs text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
