import React, { useContext, useState, useEffect } from "react";
import { 
  Plus,
  Edit,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  X,
  Save
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import axios from 'axios';

const ScheduleSection = ({ schedule: initialSchedule }) => {
  const { theme } = useContext(ThemeContext);
  const [schedule, setSchedule] = useState(initialSchedule || []);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    organization: '',
    status: 'pending'
  });

  // Fetch schedule from backend on mount
  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      // This would be your actual API endpoint for volunteer schedules
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/volunteer/schedule`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setSchedule(response.data.schedule);
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
      // Fallback to initial schedule if API fails
      setSchedule(initialSchedule || []);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEvent = async () => {
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/volunteer/schedule`,
        formData,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setSchedule(prev => [...prev, response.data.event]);
        setShowAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditEvent = async () => {
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/volunteer/schedule/${editingEvent.id}`,
        formData,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setSchedule(prev => prev.map(event => 
          event.id === editingEvent.id ? response.data.event : event
        ));
        setEditingEvent(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEvent = async (eventId) => {
    if (!confirm('Are you sure you want to cancel this event?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/volunteer/schedule/${eventId}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setSchedule(prev => prev.filter(event => event.id !== eventId));
      }
    } catch (error) {
      console.error('Error canceling event:', error);
      alert('Failed to cancel event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      organization: event.organization,
      status: event.status
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      organization: '',
      status: 'pending'
    });
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingEvent(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          My Schedule
        </h2>
        <button 
          onClick={() => setShowAddModal(true)}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </button>
      </div>

      {loading && !schedule.length ? (
        <div className={`rounded-lg shadow-sm border p-8 text-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>Loading schedule...</p>
        </div>
      ) : schedule.length === 0 ? (
        <div className={`rounded-lg shadow-sm border p-8 text-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <Calendar className={`mx-auto h-12 w-12 mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
          <p className={`text-lg font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            No events scheduled
          </p>
          <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
            Click "Add Event" to schedule your first volunteer activity
          </p>
        </div>
      ) : (
        <div className={`rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <div className="p-6">
            <div className="space-y-4">
              {schedule.map((item) => (
                <div key={item.id} className={`rounded-lg p-4 hover:shadow-sm transition-shadow ${theme === 'light' ? 'border border-gray-200' : 'border border-gray-600 bg-gray-700'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : item.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                      <button 
                        onClick={() => openEditModal(item)}
                        disabled={loading}
                        className={`hover:text-blue-600 transition-colors disabled:opacity-50 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className={`flex items-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      <Calendar className="mr-2 h-4 w-4" />
                      {item.date}
                    </div>
                    <div className={`flex items-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      <Clock className="mr-2 h-4 w-4" />
                      {item.time}
                    </div>
                    <div className={`flex items-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      <MapPin className="mr-2 h-4 w-4" />
                      {item.location}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Organization: {item.organization}
                    </p>
                    <div className="flex space-x-2">
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={() => {/* Add contact functionality */}}
                      >
                        Contact
                      </button>
                      <button 
                        className="text-sm text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                        onClick={() => handleCancelEvent(item.id)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {(showAddModal || editingEvent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className={`w-full max-w-md rounded-lg shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button 
                onClick={closeModal}
                className={`hover:text-gray-600 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., Food Distribution"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Time *
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., Community Center"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., Red Cross"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                disabled={loading}
                className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                  theme === 'light'
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={editingEvent ? handleEditEvent : handleAddEvent}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Saving...' : (editingEvent ? 'Update Event' : 'Add Event')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleSection;