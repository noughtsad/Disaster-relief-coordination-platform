import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { QrCode, Copy, CheckCircle, Heart, CreditCard, Smartphone } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function DonationsPage() {
  const { theme } = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const upiId = "rudralaheri05@oksbi";
  const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000];

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const getSelectedAmount = () => {
    return customAmount || selectedAmount || 0;
  };

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
      {/* Navigation */}
      <nav className={`px-6 py-4 border-b flex items-center justify-between ${
        theme === "light" 
          ? "bg-white border-gray-200" 
          : "bg-gray-800 border-gray-700"
      }`}>
        <h1 className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          CrisisConnect
        </h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/about"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              theme === "light" 
                ? "text-gray-600 hover:text-gray-900" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            About
          </Link>
          <Link 
            to="/"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              theme === "light" 
                ? "text-gray-600 hover:text-gray-900" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            How it Works
          </Link>
          <Link 
            to="/feedback"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              theme === "light" 
                ? "text-gray-600 hover:text-gray-900" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Contact
          </Link>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Donate
          </button>
          <Link 
            to="/login"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              theme === "light" 
                ? "text-gray-600 hover:text-gray-900" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div>
                <h1 className={`text-6xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  Pay up
                </h1>
                <p className={`text-xl mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Trust me, we got this
                </p>
                <p className={`text-lg font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  Just Do It.
                </p>
              </div>

              {/* Donation Amount Selection */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  Choose Amount
                </h3>
                
                {/* Predefined Amounts */}
                <div className="grid grid-cols-3 gap-3">
                  {predefinedAmounts.map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        selectedAmount === amount
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : theme === "light"
                            ? 'border-gray-300 hover:border-blue-300 text-gray-700'
                            : 'border-gray-600 hover:border-blue-500 text-gray-300 bg-gray-800'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                    Or enter custom amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      theme === "light" 
                        ? "bg-white border-gray-300" 
                        : "bg-gray-800 border-gray-600 text-white"
                    } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all`}
                  />
                </div>

                {/* Selected Amount Display */}
                {getSelectedAmount() > 0 && (
                  <div className={`p-4 rounded-lg border ${
                    theme === "light" 
                      ? "bg-green-50 border-green-200" 
                      : "bg-green-900/20 border-green-700"
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-green-600" />
                      <span className={`font-semibold ${theme === "light" ? "text-green-800" : "text-green-400"}`}>
                        Your donation: ₹{getSelectedAmount()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Fun Message */}
              <div className={`p-4 rounded-lg ${theme === "light" ? "bg-yellow-50" : "bg-yellow-900/20"}`}>
                <p className={`text-sm italic ${theme === "light" ? "text-yellow-800" : "text-yellow-400"}`}>
                  "Communism for the win?" - Because sharing is caring! 🚀
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  Payment Methods
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border-2 border-blue-600 ${
                    theme === "light" ? "bg-blue-50" : "bg-blue-900/20"
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-600">UPI Payment</p>
                        <p className={`text-xs ${theme === "light" ? "text-blue-700" : "text-blue-400"}`}>
                          Scan QR or use UPI ID
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg border ${
                    theme === "light" 
                      ? "border-gray-300 bg-gray-50" 
                      : "border-gray-600 bg-gray-800"
                  }`}>
                    <div className="flex items-center space-x-3">
                      <CreditCard className={`w-6 h-6 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`} />
                      <div>
                        <p className={`font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                          Card Payment
                        </p>
                        <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                          Coming soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - QR Code */}
            <div className="flex justify-center">
              <div className={`p-8 rounded-2xl shadow-lg border ${
                theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "bg-gray-800 border-gray-700"
              }`}>
                <div className="text-center space-y-6">
                  {/* QR Code Placeholder */}
                  <div className="w-64 h-64 bg-white p-4 rounded-lg shadow-inner border-2 border-gray-100">
                    <div className="w-full h-full bg-black relative">
                      {/* QR Code Pattern Simulation */}
                      <div className="absolute inset-0 grid grid-cols-21 gap-0">
                        {/* This creates a basic QR code-like pattern */}
                        {Array.from({ length: 441 }, (_, i) => (
                          <div
                            key={i}
                            className={`${
                              Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                            }`}
                          />
                        ))}
                      </div>
                      {/* Center logo placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                          <QrCode className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UPI ID */}
                  <div className="space-y-3">
                    <p className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      UPI ID: {upiId}
                    </p>
                    <button
                      onClick={copyUpiId}
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        copied 
                          ? 'bg-green-600 text-white' 
                          : theme === "light"
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy UPI ID</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-2">
                    <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Scan QR code with any UPI app
                    </p>
                    <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Or use the UPI ID for manual payment
                    </p>
                  </div>

                  {/* Donation Impact */}
                  {getSelectedAmount() > 0 && (
                    <div className={`mt-6 p-4 rounded-lg ${
                      theme === "light" ? "bg-blue-50" : "bg-blue-900/20"
                    }`}>
                      <h4 className="font-semibold text-blue-600 mb-2">Your Impact</h4>
                      <div className={`text-sm space-y-1 ${theme === "light" ? "text-blue-700" : "text-blue-400"}`}>
                        {getSelectedAmount() >= 100 && <p>• Provides emergency food for 1 family</p>}
                        {getSelectedAmount() >= 500 && <p>• Supplies clean water for 5 families</p>}
                        {getSelectedAmount() >= 1000 && <p>• Helps set up temporary shelter</p>}
                        {getSelectedAmount() >= 2500 && <p>• Supports medical aid supplies</p>}
                        {getSelectedAmount() >= 5000 && <p>• Funds complete relief package</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 text-center border-t ${
        theme === "light" 
          ? "border-gray-200 text-gray-600" 
          : "border-gray-700 text-gray-400"
      }`}>
        <p className="text-sm">
          Your donation helps us provide immediate relief and long-term support to those in need.
        </p>
        <p className="text-xs mt-2">
          CrisisConnect - Connecting communities in times of crisis.
        </p>
      </footer>
    </div>
  );
}
