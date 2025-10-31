import React, { useContext } from "react";
import { useSelector } from 'react-redux';
import { 
  DollarSign, 
  Heart, 
  Users, 
  AlertCircle 
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import MapComponent from "../../components/Map";

const HomeSection = () => {
  const { theme } = useContext(ThemeContext);
  const { requests } = useSelector((state) => state.requests);
  const { donations } = useSelector((state) => state.donations);
  const { ngoProfile } = useSelector((state) => state.ngo);

  return (
    <div>
      <h1
        className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}
      >
        Welcome back, {ngoProfile.ngoName || 'NGO'}
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div
          className={`p-4 sm:p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-xs sm:text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Total Donations
              </p>
              <h2
                className={`text-xl sm:text-2xl font-bold mt-1 sm:mt-2 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                $125,000
              </h2>
            </div>
            <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
          </div>
        </div>
        <div
          className={`p-4 sm:p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                Active Campaigns
              </p>
              <h2
                className={`text-2xl font-bold mt-2 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                8
              </h2>
            </div>
            <Heart className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                Volunteers
              </p>
              <h2
                className={`text-2xl font-bold mt-2 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                245
              </h2>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                Pending Requests
              </p>
              <h2
                className={`text-2xl font-bold mt-2 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                12
              </h2>
            </div>
            <AlertCircle className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-2 gap-6">
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Recent Donations
          </h3>
          <div className="space-y-3">
            {donations.slice(0, 3).map((donation) => (
              <div
                key={donation.id}
                className={`flex justify-between items-center p-3 rounded ${
                  theme === "light" ? "bg-gray-50" : "bg-gray-800"
                }`}
              >
                <div>
                  <p
                    className={`font-medium ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {donation.donor}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {donation.campaign}
                  </p>
                </div>
                <span className="text-green-600 font-semibold">
                  ${donation.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Urgent Requests
          </h3>
          <div className="space-y-3">
            {requests
              .filter(
                (req) => req.urgency === "High" || req.urgency === "Critical"
              )
              .map((request) => (
                <div
                  key={request.id}
                  className={`p-3 rounded border-l-4 ${
                    request.urgency === "Critical"
                      ? "border-red-500"
                      : "border-orange-500"
                  } ${theme === "light" ? "bg-gray-50" : "bg-gray-800"}`}
                >
                  <p
                    className={`font-medium ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {request.title}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {request.location}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <MapComponent />
    </div>
  );
};

export default HomeSection;