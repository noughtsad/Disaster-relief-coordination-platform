import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, AlertTriangle, X, Package, UserPlus } from 'lucide-react';
import axios from 'axios';

const ITEM_TYPES = ['Shelter', 'Food', 'Water', 'Medical Supplies', 'Clothing', 'Transportation'];
const UNITS = ['units', 'kg', 'liters', 'boxes', 'pieces', 'vehicles'];

export default function ManageInventorySection({ theme, onNavigateToProfile }) {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasProfile, setHasProfile] = useState(true);
  const [formData, setFormData] = useState({
    itemType: 'Food',
    itemName: '',
    quantity: '',
    unit: 'units',
    threshold: 50,
    description: '',
  });

  useEffect(() => {
    checkProfileAndFetchInventory();
  }, []);

  const checkProfileAndFetchInventory = async () => {
    try {
      // First check if supplier profile exists
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/supplier/profile`, {
        withCredentials: true,
      });
      setHasProfile(true);
      // If profile exists, fetch inventory
      fetchInventory();
    } catch (error) {
      if (error.response?.status === 404) {
        setHasProfile(false);
      } else {
        console.error('Error checking profile:', error);
      }
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/inventory/my-inventory`, {
        withCredentials: true,
      });
      setInventory(response.data.inventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      if (error.response?.status === 404 && error.response?.data?.message?.includes('Supplier profile not found')) {
        setHasProfile(false);
      }
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/inventory/add`,
        formData,
        { withCredentials: true }
      );
      await fetchInventory();
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Error adding item:', error);
      alert(error.response?.data?.message || 'Error adding item');
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/inventory/update/${editingItem._id}`,
        formData,
        { withCredentials: true }
      );
      await fetchInventory();
      setShowEditModal(false);
      setEditingItem(null);
      resetForm();
    } catch (error) {
      console.error('Error updating item:', error);
      alert(error.response?.data?.message || 'Error updating item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/inventory/delete/${itemId}`, {
        withCredentials: true,
      });
      await fetchInventory();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(error.response?.data?.message || 'Error deleting item');
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      itemType: item.itemType,
      itemName: item.itemName,
      quantity: item.quantity,
      unit: item.unit,
      threshold: item.threshold,
      description: item.description || '',
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      itemType: 'Food',
      itemName: '',
      quantity: '',
      unit: 'units',
      threshold: 50,
      description: '',
    });
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || item.itemType === filterType;
    return matchesSearch && matchesFilter;
  });

  const lowStockCount = inventory.filter(item => item.isLowStock).length;

  // If no supplier profile exists, show onboarding message
  if (!hasProfile) {
    return (
      <div className="space-y-6">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Manage Inventory
        </h2>
        
        <div className={`p-12 rounded-lg shadow-sm border text-center ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <UserPlus className={`mx-auto h-16 w-16 mb-4 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Create Your Supplier Profile First
          </h3>
          <p className={`mb-6 max-w-md mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Before you can manage inventory, you need to set up your supplier profile with your company details and location.
          </p>
          <button
            onClick={onNavigateToProfile}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Profile Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Manage Inventory
          </h2>
          {lowStockCount > 0 && (
            <p className="flex items-center text-yellow-600 mt-1">
              <AlertTriangle className="h-4 w-4 mr-1" />
              {lowStockCount} item{lowStockCount > 1 ? 's' : ''} low on stock
            </p>
          )}
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} h-4 w-4`} />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
            }`}
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={`px-4 py-2 border rounded-lg ${
            theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
          }`}
        >
          <option value="All">All Types</option>
          {ITEM_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Inventory Table */}
      <div className={`rounded-lg shadow-sm border overflow-hidden ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
      }`}>
        {filteredInventory.length === 0 ? (
          <div className="text-center py-12">
            <Package className={`mx-auto h-12 w-12 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            <p className={`mt-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              No inventory items found. Add your first item to get started!
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Item</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Type</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Quantity</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Status</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Last Updated</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
              {filteredInventory.map(item => (
                <tr key={item._id} className={item.isLowStock ? (theme === 'light' ? 'bg-yellow-50' : 'bg-yellow-900 bg-opacity-20') : ''}>
                  <td className={`px-6 py-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    <div className="flex items-center">
                      {item.isLowStock && <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />}
                      {item.itemName}
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {item.itemType}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.isLowStock ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.isLowStock ? `Low Stock (< ${item.threshold})` : 'In Stock'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-md w-full rounded-lg shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {showAddModal ? 'Add Inventory Item' : 'Edit Inventory Item'}
              </h3>
              <button
                onClick={() => {
                  showAddModal ? setShowAddModal(false) : setShowEditModal(false);
                  resetForm();
                  setEditingItem(null);
                }}
                className={theme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-500 hover:text-gray-300'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={showAddModal ? handleAddItem : handleEditItem} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Item Type *
                </label>
                <select
                  value={formData.itemType}
                  onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                  required
                >
                  {ITEM_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                  placeholder="e.g., Canned Beans, Bottled Water"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Quantity *
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600 text-white'
                    }`}
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Unit *
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600 text-white'
                    }`}
                    required
                  >
                    {UNITS.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Low Stock Threshold
                </label>
                <input
                  type="number"
                  value={formData.threshold}
                  onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                  min="0"
                />
                <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  You'll be alerted when quantity drops below this value
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                  rows="3"
                  placeholder="Optional: Add more details about this item"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (showAddModal ? 'Add Item' : 'Update Item')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showAddModal ? setShowAddModal(false) : setShowEditModal(false);
                    resetForm();
                    setEditingItem(null);
                  }}
                  className={`px-4 py-2 border rounded-lg ${
                    theme === 'light' ? 'border-gray-300 hover:bg-gray-50' : 'border-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}