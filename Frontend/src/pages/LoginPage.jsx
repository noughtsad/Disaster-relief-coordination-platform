import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setLoading, setError, clearError } from "../store/appSlice";

const LoginComponent = ({ formData, handleInputChange, handleLogin, handleGoogleSignIn }) => (
  <div className="max-w-sm mx-auto w-full">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Login</h2>

    {/* Email */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
      <span className="text-xs font-medium text-gray-500 bg-white px-2">OR</span>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
    </div>

    {/* Google Login */}
    <button
      onClick={handleGoogleSignIn}
      className="w-full bg-white text-gray-700 py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all"
    >
      Sign in with Google
    </button>
  </div>
);

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.app);

  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) navigate("/survivorDashboard");
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (formData.email === "test@example.com" && formData.password === "password") {
        dispatch(setUser({ email: formData.email, userType: "survivor" }));
        localStorage.setItem("token", "dummy-token");
      } else throw new Error("Invalid credentials");
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && <p className="text-blue-500 text-center mb-4">Loading...</p>}
        <LoginComponent
          formData={formData}
          handleInputChange={handleInputChange}
          handleLogin={handleLogin}
          handleGoogleSignIn={handleGoogleSignIn}
        />
        <div className="text-center mt-4">
          <span className="text-xs text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
