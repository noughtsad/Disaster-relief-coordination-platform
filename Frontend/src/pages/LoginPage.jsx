import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setUser, setLoading, setError, clearError, setIsAuthenticated } from "../store/appSlice";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector((state) => state.app);

  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      // Navigate to the page they were trying to access, or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

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
      // Navigation will be handled by the useEffect above
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-stone-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-8 text-gray-800">Welcome Back</h1>

        {error && <p className="text-red-600 text-center mb-6 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
        {loading && (
          <p className="text-slate-600 text-center mb-6 bg-slate-50 p-3 rounded-lg border border-slate-200">Loading...</p>
        )}

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="example@email.com"
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none transition-all"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-slate-700 text-white py-3 rounded-lg text-sm font-semibold hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all mb-4"
        >
          Login
        </button>

        {/* OR Divider */}
        <div className="relative text-center my-6">
          <span className="text-sm font-medium text-gray-500 bg-white px-4">
            OR
          </span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-white text-gray-700 py-3 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all"
        >
          <FaGoogle className="inline-block mr-2 text-gray-600" />
          <p>Sign up with Google</p>
        </button>

        {/* Bottom link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-slate-700 hover:text-slate-900 font-semibold underline decoration-slate-300 hover:decoration-slate-500 transition-all"
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
