import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { 
  Heart, 
  CreditCard, 
  Smartphone, 
  QrCode, 
  Copy, 
  Check, 
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Gift,
  Star,
  Download
} from "lucide-react";

const DonationsPage = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [copied, setCopied] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const upiId = "rudralaheri05@oksbi";
  const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000];

  // Mock donation statistics
  const donationStats = {
    totalRaised: "₹12,45,680",
    totalDonors: "2,847",
    activeProjects: "23",
    helpedFamilies: "1,156"
  };

  // Mock recent donations
  const recentDonations = [
    { name: "Anonymous", amount: "₹5,000", time: "2 minutes ago", message: "Stay strong!" },
    { name: "Priya S.", amount: "₹1,000", time: "5 minutes ago", message: "Hope this helps" },
    { name: "Rahul K.", amount: "₹2,500", time: "8 minutes ago", message: "For the community" },
    { name: "Anonymous", amount: "₹500", time: "12 minutes ago", message: "" },
    { name: "Sunita M.", amount: "₹750", time: "15 minutes ago", message: "Prayers with you all" }
  ];

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDonate = () => {
    const amount = customAmount || selectedAmount;
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  return (
    <motion.div 
      className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50' : 'bg-gray-900'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1 
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Pay up
          </motion.h1>
          <motion.div 
            className="space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className={`text-2xl font-semibold ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-200'
            }`}>
              Trust me, we got this
            </p>
            <p className={`text-2xl font-semibold ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-200'
            }`}>
              Just Do It.
            </p>
          </motion.div>
          <motion.div 
            className="mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className={`text-lg ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Your donation helps us provide immediate disaster relief and long-term support to communities in need.
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Donation Form */}
          <div className={`bg-white rounded-3xl p-8 shadow-2xl border ${
            theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className={`text-3xl font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Make a Difference
              </h2>
              <p className={`text-lg mt-2 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Every contribution counts
              </p>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Choose Amount
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      selectedAmount === amount && !customAmount
                        ? 'bg-blue-600 text-white shadow-lg'
                        : theme === 'light'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === 'light'
                      ? 'border-gray-300 bg-white text-gray-900'
                      : 'border-gray-600 bg-gray-700 text-white'
                  }`}
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Payment Method
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "upi"
                      ? 'border-blue-500 bg-blue-50'
                      : theme === 'light'
                      ? 'border-gray-300 hover:border-gray-400'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <Smartphone className="h-6 w-6 text-blue-600 mr-3" />
                    <span className={`font-medium ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      UPI Payment
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    paymentMethod === "upi"
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400'
                  }`} />
                </button>
                
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "card"
                      ? 'border-blue-500 bg-blue-50'
                      : theme === 'light'
                      ? 'border-gray-300 hover:border-gray-400'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                    <span className={`font-medium ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Credit/Debit Card
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    paymentMethod === "card"
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400'
                  }`} />
                </button>
              </div>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg transform hover:scale-105"
            >
              Donate ₹{customAmount || selectedAmount}
            </button>
          </div>

          {/* Right Side - QR Code */}
          <div className="flex flex-col items-center justify-center">
            <div className={`bg-white rounded-3xl p-8 shadow-2xl border text-center ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            }`}>
              <h3 className={`text-2xl font-bold mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Communism for the win?
              </h3>
              
              {/* QR Code */}
              <div className="bg-white p-6 rounded-xl shadow-inner mb-6">
                <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  {/* QR Code placeholder - in real implementation, you'd generate actual QR code */}
                  <div className="w-full h-full bg-white border-8 border-black relative">
                    <div className="absolute inset-4 bg-black"></div>
                    <div className="absolute top-8 left-8 w-12 h-12 bg-white border-4 border-black"></div>
                    <div className="absolute top-8 right-8 w-12 h-12 bg-white border-4 border-black"></div>
                    <div className="absolute bottom-8 left-8 w-12 h-12 bg-white border-4 border-black"></div>
                    
                    {/* Google Pay logo in center */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                    </div>
                    
                    {/* QR pattern simulation */}
                    <div className="absolute inset-16 opacity-80">
                      <div className="grid grid-cols-8 grid-rows-8 gap-1 h-full w-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPI ID */}
              <div className={`bg-gray-50 rounded-lg p-4 mb-6 ${
                theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
              }`}>
                <p className={`text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  UPI ID: {upiId}
                </p>
                <button
                  onClick={handleCopyUPI}
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy UPI ID
                    </>
                  )}
                </button>
              </div>

              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Scan with any UPI app to donate instantly
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className={`bg-white rounded-xl p-6 text-center shadow-lg ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}>
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <p className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {donationStats.totalRaised}
            </p>
            <p className={`text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Total Raised
            </p>
          </div>
          
          <div className={`bg-white rounded-xl p-6 text-center shadow-lg ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}>
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <p className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {donationStats.totalDonors}
            </p>
            <p className={`text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Donors
            </p>
          </div>
          
          <div className={`bg-white rounded-xl p-6 text-center shadow-lg ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}>
            <Target className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <p className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {donationStats.activeProjects}
            </p>
            <p className={`text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Active Projects
            </p>
          </div>
          
          <div className={`bg-white rounded-xl p-6 text-center shadow-lg ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}>
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <p className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {donationStats.helpedFamilies}
            </p>
            <p className={`text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Families Helped
            </p>
          </div>
        </div>

        {/* Recent Donations */}
        <div className={`bg-white rounded-2xl p-8 shadow-lg border ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 flex items-center ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            <Gift className="h-6 w-6 mr-3 text-yellow-500" />
            Recent Donations
          </h3>
          
          <div className="space-y-4">
            {recentDonations.map((donation, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
                theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
              }`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {donation.name}
                    </p>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {donation.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-green-600 ${
                    theme === 'light' ? 'text-green-600' : 'text-green-400'
                  }`}>
                    {donation.amount}
                  </p>
                  {donation.message && (
                    <p className={`text-sm italic ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      "{donation.message}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4 shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your donation of ₹{customAmount || selectedAmount} will make a real difference in someone's life.
            </p>
            <button
              onClick={() => setShowThankYou(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DonationsPage;