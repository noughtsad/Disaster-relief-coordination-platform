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
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/auth/google";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-stone-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-8">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Create Your Account
        </h1>

        {error && <p className="text-red-600 text-center mb-6 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
        {loading && (
          <p className="text-slate-600 text-center mb-6 bg-slate-50 p-3 rounded-lg border border-slate-200">Loading...</p>
        )}

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your Full Name"
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none transition-all"
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="9876504012"
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none transition-all"
          />
        </div>

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
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Create a password"
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none transition-all"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none transition-all"
          />
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-slate-700 text-white py-3 rounded-lg text-sm font-semibold hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all mb-4"
        >
          Sign Up
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
            Already have an account?{" "}
            <a
              href="/login"
              className="text-slate-700 hover:text-slate-900 font-semibold underline decoration-slate-300 hover:decoration-slate-500 transition-all"
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
