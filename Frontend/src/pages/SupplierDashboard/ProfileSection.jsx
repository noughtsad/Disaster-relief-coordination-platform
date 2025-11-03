import React, { useState, useEffect } from 'react';
import { Edit, MapPin, Phone, Mail, Clock, Star, Save, X } from 'lucide-react';
import axios from 'axios';

export default function ProfileSection({ theme }) {
  const [supplierProfile, setSupplierProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
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
      const response = await axios.get('http://localhost:5000/supplier/profile', {
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
        setShowCreateForm(true);
      } else {
        console.error('Error fetching profile:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      alert('Please fill in all required fields (Name, Email, Phone, Address)');
      return;
    }
    
    if (!formData.lat || !formData.lng) {
      alert('Please provide location coordinates. You can use "Use my current location" button or enter them manually.');
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
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
        deliveryTimeEstimate: parseInt(formData.deliveryTimeEstimate) || 24,
      };
      
      console.log('Creating supplier profile with data:', payload);
      
      const response = await axios.post(
        'http://localhost:5000/supplier/create',
        payload,
        { withCredentials: true }
      );
      
      console.log('Profile created successfully:', response.data);
      await fetchProfile();
      setShowCreateForm(false);
      alert('Supplier profile created successfully!');
    } catch (error) {
      console.error('Error creating profile:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Error creating profile';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        'http://localhost:5000/supplier/update',
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

  if (loading && !showCreateForm) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Loading profile...</p>
      </div>
    );
  }

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Create Supplier Profile
          </h2>
          <p className={`mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Set up your supplier profile to start managing inventory and receiving orders from NGOs.
          </p>
        </div>

        <form onSubmit={handleCreateProfile} className={`p-6 rounded-lg shadow-sm border ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                Company Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                Phone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                Delivery Time Estimate (hours) *
              </label>
              <input
                type="number"
                value={formData.deliveryTimeEstimate}
                onChange={(e) => setFormData({ ...formData, deliveryTimeEstimate: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                }`}
                min="1"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
              Address *
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows="2"
              className={`w-full px-3 py-2 border rounded-lg ${
                theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
              }`}
              required
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                Latitude *
              </label>
              <input
                type="number"
                step="any"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                Longitude *
              </label>
              <input
                type="number"
                step="any"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                }`}
                required
              />
            </div>
          </div>

          <button
            type="button"
            onClick={getCurrentLocation}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Use my current location
          </button>

          <div className="mt-6 flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Supplier Profile</h2>
      
      <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Company Information</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile();
                }}
                className={`flex items-center px-4 py-2 border rounded-lg ${
                  theme === 'light' ? 'border-gray-300 hover:bg-gray-50' : 'border-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdateProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Company Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Delivery Time (hours)</label>
                <input
                  type="number"
                  value={formData.deliveryTimeEstimate}
                  onChange={(e) => setFormData({ ...formData, deliveryTimeEstimate: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                  min="1"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows="2"
                className={`w-full px-3 py-2 border rounded-lg ${
                  theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                }`}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.lng}
                  onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                />
              </div>
            </div>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Company Name</label>
                <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile?.name}</p>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Email</label>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile?.contact.email}</p>
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Phone</label>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-gray-500" />
                  <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile?.contact.phone}</p>
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Rating</label>
                <div className="flex items-center">
                  <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {supplierProfile?.rating.average.toFixed(1)}/5
                    {supplierProfile?.rating.count > 0 && (
                      <span className={`text-sm ml-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        ({supplierProfile?.rating.count} ratings)
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Delivery Time</label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile?.deliveryTimeEstimate} hours</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Address</label>
              <div className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 text-gray-500 mt-1" />
                <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile?.location.address}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}