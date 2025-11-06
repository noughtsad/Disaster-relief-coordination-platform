import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Edit, Save } from "lucide-react";
import axios from 'axios';
import { ThemeContext } from "../../context/ThemeContext";
import { updateProfile, setLoading, setError, clearError } from '../../store/appSlice';

const ProfileSection = ({ volunteerProfile }) => {
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
        `${import.meta.env.VITE_BACKEND_URL}/auth/updateProfile`,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Volunteer Profile</h2>
      
      <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Personal Information</h3>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={isEditing ? editProfile.name : volunteerProfile.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly={!isEditing}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={volunteerProfile.email}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={isEditing ? editProfile.phone : volunteerProfile.phone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly={!isEditing}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Experience</label>
            <input
              type="text"
              value={volunteerProfile.experience}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly
            />
          </div>
        </div>

        <div className="mt-6">
          <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Address</label>
          <textarea
            name="address"
            value={isEditing ? (editProfile.address || '') : (volunteerProfile.address || '')}
            onChange={handleInputChange}
            rows="2"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
            readOnly={!isEditing}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Skills</label>
            <div className="flex flex-wrap gap-2">
              {volunteerProfile.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Availability</label>
            <div className="flex flex-wrap gap-2">
              {volunteerProfile.availability.map((time, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {time}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;