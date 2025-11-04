import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Edit, Save } from "lucide-react";
import axios from 'axios';
import { ThemeContext } from "../../context/ThemeContext";
import { setNgoProfile } from '../../store/ngoSlice';

const ProfileSection = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { ngoProfile } = useSelector((state) => state.ngo);
  const { user } = useSelector((state) => state.app);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({
    ngoName: '',
    ngoContact: '',
    ngoLatitude: '',
    ngoLongitude: '',
    ngoDescription: ''
  });

  useEffect(() => {
    if (ngoProfile) {
      setEditProfile({
        ngoName: ngoProfile.ngoName || '',
        ngoContact: ngoProfile.ngoContact || '',
        ngoLatitude: ngoProfile.ngoLatitude || '',
        ngoLongitude: ngoProfile.ngoLongitude || '',
        ngoDescription: ngoProfile.ngoDescription || ''
      });
    }
  }, [ngoProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/ngo/updateProfile',
        editProfile,
        { withCredentials: true }
      );
      
      dispatch(setNgoProfile(response.data.ngo));
      setIsEditing(false);
      alert('NGO profile updated successfully!');
    } catch (err) {
      console.error('Error updating NGO profile:', err);
      alert(err.response?.data?.message || 'Failed to update NGO profile');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className={`text-3xl font-bold ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Organization Profile
        </h1>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </button>
        ) : (
          <button 
            onClick={handleSave}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Profile
          </button>
        )}
      </div>

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
                Organization Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ngoName"
                value={isEditing ? editProfile.ngoName : ngoProfile.ngoName}
                onChange={handleInputChange}
                readOnly={!isEditing}
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
                Owner Name <span className="text-red-500">*</span>
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
                Owner Email <span className="text-red-500">*</span>
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
                name="ngoContact"
                value={isEditing ? editProfile.ngoContact : ngoProfile.ngoContact}
                onChange={handleInputChange}
                readOnly={!isEditing}
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
                name="ngoLatitude"
                value={isEditing ? editProfile.ngoLatitude : ngoProfile.ngoLatitude}
                onChange={handleInputChange}
                readOnly={!isEditing}
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
                name="ngoLongitude"
                value={isEditing ? editProfile.ngoLongitude : ngoProfile.ngoLongitude}
                onChange={handleInputChange}
                readOnly={!isEditing}
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
                name="ngoDescription"
                value={isEditing ? editProfile.ngoDescription : ngoProfile.ngoDescription}
                onChange={handleInputChange}
                readOnly={!isEditing}
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
    </div>
  );
};

export default ProfileSection;