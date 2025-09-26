import React, { useState } from "react";

// Login Component
const LoginComponent = ({ formData, handleInputChange, handleLogin, handleGoogleSignIn }) => (
  <div className="max-w-sm mx-auto w-full">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Login</h2>

    {/* Email Field */}
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="example@email.com"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
      />
    </div>

    {/* Password Field */}
    <div className="mb-6">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password || ""}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
      />
    </div>

    {/* Login Button */}
    <button
      onClick={handleLogin}
      className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all mb-3"
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

    {/* Google Sign In Button */}
    <button
      onClick={handleGoogleSignIn}
      className="w-full bg-white text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all"
    >
      Sign in with Google
    </button>
  </div>
);

// Signup Component
const SignupComponent = ({ formData, handleInputChange, handleSignup, handleGoogleSignIn }) => (
  <div className="max-w-sm mx-auto w-full">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Sign Up</h2>

    {/* User Type Dropdown */}
    <div className="mb-4">
      <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
        User Type
      </label>
      <select
        id="userType"
        name="userType"
        value={formData.userType}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
      >
        <option value="survivor">Survivor</option>
        <option value="volunteer">Volunteer</option>
        <option value="ngo">NGO</option>
        <option value="local-authority">Local Authority</option>
      </select>
    </div>

    {/* Full Name */}
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Full Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Your Full Name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
      />
    </div>

    {/* Phone */}
    <div className="mb-4">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="(123) 456-7890"
        value={formData.phone}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
      />
    </div>

    {/* Email */}
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="example@email.com"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
      />
    </div>

    {/* Password */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Create a password"
        value={formData.password || ""}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
      />
    </div>

    {/* Confirm Password */}
    <div className="mb-6">
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword || ""}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
      />
    </div>

    {/* Sign Up Button */}
    <button
      onClick={handleSignup}
      className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all mb-3"
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

    {/* Google Sign In */}
    <button
      onClick={handleGoogleSignIn}
      className="w-full bg-white text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all"
    >
      Sign up with Google
    </button>
  </div>
);

// Main Auth Component
export default function CrisisConnectAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userType: "survivor",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    console.log("Login data:", formData);
  };

  const handleSignup = () => {
    console.log("Signup data:", formData);
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      userType: "survivor",
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
        {/* Header Section */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-6 leading-snug">
            You are one step away from getting help
          </h1>

          {/* Auth Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                !isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-6 pb-6">
          {isLogin ? (
            <LoginComponent
              formData={formData}
              handleInputChange={handleInputChange}
              handleLogin={handleLogin}
              handleGoogleSignIn={handleGoogleSignIn}
            />
          ) : (
            <SignupComponent
              formData={formData}
              handleInputChange={handleInputChange}
              handleSignup={handleSignup}
              handleGoogleSignIn={handleGoogleSignIn}
            />
          )}

          {/* Bottom Toggle Text */}
          <div className="text-center mt-4">
            <span className="text-xs text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleAuthMode}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
