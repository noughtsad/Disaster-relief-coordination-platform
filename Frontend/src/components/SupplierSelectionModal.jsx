import React, { useState, useEffect } from 'react';
import { X, Package, MapPin, Star, Clock, Phone, Mail, Search } from 'lucide-react';
import axios from 'axios';

export default function SupplierSelectionModal({ 
  isOpen, 
  onClose, 
  theme, 
  requestId,
  itemType,
  ngoLocation 
}) {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({
    quantity: '',
    message: '',
  });

  useEffect(() => {
    if (isOpen && itemType) {
      fetchSuppliers();
    }
  }, [isOpen, itemType]);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/supplier/with-item`,
        {
          params: {
            itemType,
            ngoLocation: ngoLocation ? JSON.stringify(ngoLocation) : undefined,
          },
          withCredentials: true,
        }
      );
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      alert(error.response?.data?.message || 'Error fetching suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSupplier = (supplier, inventoryItem) => {
    setSelectedSupplier({ supplier, inventoryItem });
    setShowRequestForm(true);
  };

  const handleSendRequest = async () => {
    if (!requestData.quantity || requestData.quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    if (parseInt(requestData.quantity) > selectedSupplier.inventoryItem.quantity) {
      if (!window.confirm(`Requested quantity (${requestData.quantity}) exceeds available stock (${selectedSupplier.inventoryItem.quantity}). The supplier can fulfill partially. Continue?`)) {
        return;
      }
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/fulfillment/create`,
        {
          survivorRequestId: requestId,
          supplierId: selectedSupplier.supplier._id,
          inventoryItemId: selectedSupplier.inventoryItem._id,
          requestedQuantity: parseInt(requestData.quantity),
          message: requestData.message,
        },
        { withCredentials: true }
      );

      alert('Fulfillment request sent to supplier successfully!');
      setShowRequestForm(false);
      setSelectedSupplier(null);
      setRequestData({ quantity: '', message: '' });
      onClose();
    } catch (error) {
      console.error('Error sending fulfillment request:', error);
      alert(error.response?.data?.message || 'Error sending fulfillment request');
    } finally {
      setLoading(false);
    }
  };

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-xl ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b z-10 ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <div>
            <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {showRequestForm ? 'Send Fulfillment Request' : 'Select Supplier'}
            </h3>
            <p className={`text-sm mt-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              {showRequestForm 
                ? `Requesting ${itemType} from ${selectedSupplier.supplier.name}`
                : `Available suppliers for ${itemType}`
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className={theme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-500 hover:text-gray-300'}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {showRequestForm ? (
            // Request Form
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h4 className={`font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {selectedSupplier.inventoryItem.itemName}
                </h4>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Available: {selectedSupplier.inventoryItem.quantity} {selectedSupplier.inventoryItem.unit}
                </p>
                {selectedSupplier.supplier.distance && (
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    Distance: {selectedSupplier.supplier.distance} km
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Quantity Needed *
                </label>
                <input
                  type="number"
                  value={requestData.quantity}
                  onChange={(e) => setRequestData({ ...requestData, quantity: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                  placeholder={`Enter quantity in ${selectedSupplier.inventoryItem.unit}`}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Message (Optional)
                </label>
                <textarea
                  value={requestData.message}
                  onChange={(e) => setRequestData({ ...requestData, message: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                  }`}
                  rows="3"
                  placeholder="Add any special instructions or notes for the supplier..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSendRequest}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Request'}
                </button>
                <button
                  onClick={() => {
                    setShowRequestForm(false);
                    setSelectedSupplier(null);
                    setRequestData({ quantity: '', message: '' });
                  }}
                  className={`px-4 py-2 border rounded-lg ${
                    theme === 'light' ? 'border-gray-300 hover:bg-gray-50' : 'border-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            // Supplier List
            <>
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                      theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
                    }`}
                  />
                </div>
              </div>

              {/* Suppliers */}
              {loading ? (
                <div className="text-center py-8">
                  <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Loading suppliers...</p>
                </div>
              ) : filteredSuppliers.length === 0 ? (
                <div className="text-center py-8">
                  <Package className={`mx-auto h-12 w-12 mb-2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                    No suppliers found with {itemType} in stock
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSuppliers.map((supplier) => (
                    <div key={supplier._id} className="space-y-3">
                      {/* Supplier Info */}
                      <div className={`p-4 rounded-lg border ${
                        theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-700 border-gray-600'
                      }`}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className={`font-semibold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                              {supplier.name}
                            </h4>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              {supplier.rating?.average > 0 && (
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                  <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                                    {supplier.rating.average.toFixed(1)} ({supplier.rating.count} ratings)
                                  </span>
                                </div>
                              )}
                              {supplier.deliveryTimeEstimate && (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 text-blue-500 mr-1" />
                                  <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                                    {supplier.deliveryTimeEstimate}h delivery
                                  </span>
                                </div>
                              )}
                              {supplier.distance && (
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 text-green-500 mr-1" />
                                  <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                                    {supplier.distance} km away
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className={`text-sm space-y-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {supplier.contact?.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {supplier.contact?.email}
                          </div>
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                            <span>{supplier.contact?.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Available Items */}
                      <div className="ml-4 space-y-2">
                        {supplier.inventory?.map((item) => (
                          <div
                            key={item._id}
                            className={`p-3 rounded-lg border flex items-center justify-between ${
                              theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-600'
                            }`}
                          >
                            <div>
                              <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {item.itemName}
                              </p>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                Available: {item.quantity} {item.unit}
                                {item.isLowStock && (
                                  <span className="ml-2 text-yellow-600 font-medium">(Low Stock)</span>
                                )}
                              </p>
                            </div>
                            <button
                              onClick={() => handleSelectSupplier(supplier, item)}
                              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                            >
                              Request
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
