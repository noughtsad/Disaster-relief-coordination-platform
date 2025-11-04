import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Edit, Save } from "lucide-react";
import axios from 'axios';
import { ThemeContext } from "../../context/ThemeContext";
import { updateProfile, setLoading, setError, clearError } from '../../store/appSlice';

const ProfileSection = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { user: profile } = useSelector((state) => state.app);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({...profile});

  useEffect(() => {
    setEditProfile(profile);
  }, [profile]);

  const handleSave = async () => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await axios.put(
        'http://localhost:5000/auth/updateProfile',
        {
          name: editProfile.name,
          phone: editProfile.phone,
          address: editProfile.address,
          emergencyContact: editProfile.emergencyContact,
        },
        { withCredentials: true }
      );
      
      dispatch(updateProfile(response.data.user));
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Failed to update profile'));
      alert(err.response?.data?.message || 'Failed to update profile');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold drop-shadow ${theme === "light" ? "text-black" : "text-white"}`}>
          Profile
        </h2>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <h3 className={`font-semibold text-lg mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={isEditing ? editProfile.name : profile.name}
                onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isEditing 
                    ? theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
                    : theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={isEditing ? editProfile.email : profile.email}
                onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isEditing 
                    ? theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
                    : theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={`backdrop-blur border rounded-xl p-6 shadow-lg ${
          theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/95 border-gray-700"
        }`}>
          <h3 className={`font-semibold text-lg mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Contact Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                Phone Number
              </label>
              <input
                type="text"
                value={isEditing ? editProfile.phone : profile.phone}
                onChange={(e) => setEditProfile({...editProfile, phone: e.target.value})}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isEditing 
                    ? theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-800 text-white"
                    : theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800 text-gray-300"
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                User Type
              </label>
              <input
                type="text"
                value={profile.userType}
                disabled
                className={`w-full px-3 py-2 border rounded-lg ${ theme === "light" ? "border-gray-200 bg-gray-50" : "border-gray-700 bg-gray-800 text-gray-300"}`}
              />
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditProfile({...profile});
            }}
            className={`px-6 py-2 border rounded-lg transition ${
              theme === "light" ? "border-gray-300 hover:bg-gray-50" : "border-gray-600 hover:bg-gray-700 text-white"
            }`}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;