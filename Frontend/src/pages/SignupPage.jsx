import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setLoading, setError, clearError } from "../store/appSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.app);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/survivorDashboard");
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      dispatch(setUser(data.user));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google signup clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && <p className="text-blue-500 text-center mb-4">Loading...</p>}

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your Full Name"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="(123) 456-7890"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>

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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Create a password"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all mb-3"
        >
          Sign Up
        </button>

        {/* OR Divider */}
        <div className="relative text-center my-4">
          <span className="text-xs font-medium text-gray-500 bg-white px-2">OR</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-gray-700 py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all"
        >
          Sign up with Google
        </button>

        {/* Bottom link */}
        <div className="text-center mt-4">
          <span className="text-xs text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;