import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser, setLoading, setError, clearError, setIsAuthenticated } from "../store/appSlice";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from "axios";
import { FaGoogle } from "react-icons/fa";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error, user } = useSelector((state) => state.app);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      dispatch(setError('All fields are required'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      dispatch(setError('Passwords do not match'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearError());
    
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: null,
          phone: formData.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
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
      dispatch(setError(err.response.data.message || "Signup failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google login clicked");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && (
          <p className="text-blue-500 text-center mb-4">Loading...</p>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="9876504012"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200 transition-all"
          />
        </div>

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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
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
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
