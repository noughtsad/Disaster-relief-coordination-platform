import React, { useContext } from "react";
import { useSelector } from 'react-redux';
import { ThemeContext } from "../../context/ThemeContext";

const ProfileSection = () => {
  const { theme } = useContext(ThemeContext);
  const { ngoProfile } = useSelector((state) => state.ngo);
  const { user } = useSelector((state) => state.app);

  return (
    <div>
      <h1
        className={`text-3xl font-bold mb-6 ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}
      >
        Organization Profile
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Basic Information */}
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
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Organization Name
              </label>
              <input
                type="text"
                value={ngoProfile.ngoName}
                readOnly
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === "light"
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Owner Name
              </label>
              <input
                type="text"
                value={user?.name || 'N/A'}
                readOnly
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === "light"
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Owner Email
              </label>
              <input
                type="email"
                value={user?.email || 'N/A'}
                readOnly
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === "light"
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Contact Information
              </label>
              <input
                type="text"
                value={ngoProfile.ngoContact}
                readOnly
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === "light"
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Address & Location */}
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
            Location
          </h3>
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Latitude
              </label>
              <input
                type="text"
                value={ngoProfile.ngoLatitude}
                readOnly
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === "light"
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Longitude
              </label>
              <input
                type="text"
                value={ngoProfile.ngoLongitude}
                readOnly
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === "light"
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Mission & Description */}
        <div
          className={`col-span-2 p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Description
          </h3>
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Organization Description
              </label>
              <textarea
                rows={4}
                value={ngoProfile.ngoDescription}
                readOnly
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === "light"
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Edit Profile {/* This would trigger an edit mode */}
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;