import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Edit, Save } from 'lucide-react';
import axios from 'axios';
import { ThemeContext } from '../../context/ThemeContext';

export default function ProfileSection() {
  const { theme } = useContext(ThemeContext);
  const { user } = useSelector((state) => state.app);
  const [supplierProfile, setSupplierProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    lat: '',
    lng: '',
    deliveryTimeEstimate: 24,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/supplier/profile`, {
        withCredentials: true,
      });
      setSupplierProfile(response.data.supplier);
      setFormData({
        name: response.data.supplier.name,
        phone: response.data.supplier.contact.phone,
        email: response.data.supplier.contact.email,
        address: response.data.supplier.contact.address,
        lat: response.data.supplier.location.coordinates[1],
        lng: response.data.supplier.location.coordinates[0],
        deliveryTimeEstimate: response.data.supplier.deliveryTimeEstimate,
      });
    } catch (error) {
      if (error.response?.status === 404) {
        // Profile not found - this shouldn't happen as profile is created during registration
        console.error('Supplier profile not found. Please contact support or try logging in again.');
        alert('Supplier profile not found. Please try logging out and logging in again to complete setup.');
      } else {
        console.error('Error fetching profile:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/supplier/update`,
        {
          name: formData.name,
          contact: {
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
          },
          location: {
            lat: parseFloat(formData.lat),
            lng: parseFloat(formData.lng),
            address: formData.address,
          },
          deliveryTimeEstimate: parseInt(formData.deliveryTimeEstimate),
        },
        { withCredentials: true }
      );
      await fetchProfile();
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter coordinates manually.');
        }
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Loading profile...</p>
      </div>
    );
  }

  if (!supplierProfile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Profile Not Found
          </p>
          <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
            Please try logging out and logging in again to complete your profile setup.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Supplier Profile</h2>
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
            onClick={handleUpdateProfile}
            disabled={loading}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Profile
          </button>
        )}
      </div>
      
      <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Company Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Company Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={isEditing ? formData.name : (supplierProfile?.name || '')}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              readOnly={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
              }`}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={isEditing ? formData.email : (supplierProfile?.contact.email || '')}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              readOnly={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
              }`}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Phone</label>
            <input
              type="tel"
              value={isEditing ? formData.phone : (supplierProfile?.contact.phone || '')}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              readOnly={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
              }`}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Delivery Time (hours)</label>
            <input
              type="number"
              value={isEditing ? formData.deliveryTimeEstimate : (supplierProfile?.deliveryTimeEstimate || '')}
              onChange={(e) => setFormData({ ...formData, deliveryTimeEstimate: e.target.value })}
              readOnly={!isEditing}
              min="1"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
              }`}
            />
          </div>

          {!isEditing && supplierProfile?.rating && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Rating</label>
              <input
                type="text"
                value={`${supplierProfile.rating.average.toFixed(1)}/5 ${supplierProfile.rating.count > 0 ? `(${supplierProfile.rating.count} ratings)` : ''}`}
                readOnly
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                }`}
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Address</label>
          <textarea
            value={isEditing ? formData.address : (supplierProfile?.location.address || '')}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            readOnly={!isEditing}
            rows="2"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
            }`}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Latitude</label>
            <input
              type="number"
              step="any"
              value={isEditing ? formData.lat : (supplierProfile?.location.coordinates?.[1] || '')}
              onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
              readOnly={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
              }`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Longitude</label>
            <input
              type="number"
              step="any"
              value={isEditing ? formData.lng : (supplierProfile?.location.coordinates?.[0] || '')}
              onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
              readOnly={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}