import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateProfile,
  setLoading,
  setError,
  clearError,
} from "../store/appSlice";
import { setNgoProfile } from '../store/ngoSlice';
import { ThemeContext } from "../context/ThemeContext";
import { User, Building, HandHeart, Package, ArrowLeft } from "lucide-react";
import axios from "axios";

export default function UserTypeSelectionPage() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.app);

  const [selectedUserType, setSelectedUserType] = useState("");
  const [ngoDetails, setNgoDetails] = useState({
    ngoName: "",
    ngoLatitude: "",
    ngoLongitude: "",
    ngoContact: "",
    ngoDescription: "",
  });
  const [supplierDetails, setSupplierDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    latitude: "",
    longitude: "",
    deliveryTimeEstimate: "24",
  });

  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
    dispatch(clearError());
  };

  const handleNgoChange = (e) => {
    const { name, value } = e.target;
    setNgoDetails({ ...ngoDetails, [name]: value });
  };

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setSupplierDetails({ ...supplierDetails, [name]: value });
  };

  const handleGetCurrentLocation = (isNgo = true) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          if (isNgo) {
            setNgoDetails({ ...ngoDetails, ngoLatitude: lat, ngoLongitude: lng });
          } else {
            setSupplierDetails({ ...supplierDetails, latitude: lat, longitude: lng });
          }
        },
        (error) => {
          alert("Unable to retrieve your location. Please enter manually.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      if (selectedUserType === "Survivor") {
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/auth/updateUserType",
          { userId: user._id, userType: "Survivor" },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        dispatch(
          updateProfile({ ...user, userType: response.data.user.userType })
        );
        navigate("/survivorDashboard");
      } else if (selectedUserType === "NGO") {
        if (
          !ngoDetails.ngoName ||
          !ngoDetails.ngoLatitude ||
          !ngoDetails.ngoLongitude ||
          !ngoDetails.ngoContact ||
          !ngoDetails.ngoDescription
        ) {
          dispatch(setError("Please fill in all required NGO details."));
          return;
        }
        const userTypeUpdateResponse = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/auth/updateUserType",
          { userId: user._id, userType: "NGO" },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        dispatch(
          updateProfile({ ...user, userType: userTypeUpdateResponse.data.user.userType })
        );

        const ngoDetailsResponse = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/ngo",
          {
            ngoName: ngoDetails.ngoName,
            ngoLatitude: ngoDetails.ngoLatitude,
            ngoLongitude: ngoDetails.ngoLongitude,
            ngoContact: ngoDetails.ngoContact,
            ngoDescription: ngoDetails.ngoDescription,
            owner: user._id,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        dispatch(setNgoProfile(ngoDetailsResponse.data.ngo));
        navigate("/ngoDashboard");
      } else if (selectedUserType === "Volunteer") {
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/auth/updateUserType",
          { userId: user._id, userType: "Volunteer" },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        dispatch(
          updateProfile({ ...user, userType: response.data.user.userType })
        );
        navigate("/volunteer");
      } else if (selectedUserType === "Supplier") {
        if (
          !supplierDetails.name ||
          !supplierDetails.phone ||
          !supplierDetails.email ||
          !supplierDetails.address ||
          !supplierDetails.latitude ||
          !supplierDetails.longitude
        ) {
          dispatch(setError("Please fill in all required supplier details."));
          return;
        }
        
        // Update user type first
        const userTypeUpdateResponse = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/auth/updateUserType",
          { userId: user._id, userType: "Supplier" },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        dispatch(
          updateProfile({ ...user, userType: userTypeUpdateResponse.data.user.userType })
        );

        // Create supplier profile
        const supplierProfileResponse = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/supplier/create",
          {
            name: supplierDetails.name,
            contact: {
              phone: supplierDetails.phone,
              email: supplierDetails.email,
              address: supplierDetails.address,
            },
            location: {
              lat: parseFloat(supplierDetails.latitude),
              lng: parseFloat(supplierDetails.longitude),
              address: supplierDetails.address,
            },
            deliveryTimeEstimate: parseInt(supplierDetails.deliveryTimeEstimate) || 24,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        
        navigate("/supplierDashboard");
      }
    } catch (err) {
      console.error(err);
      dispatch(
        setError(
          err.response?.data?.message ||
            "Failed to set user type or save NGO details."
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className={`backdrop-blur border rounded-xl p-8 shadow-lg max-w-2xl w-full ${
            theme === "light"
              ? "bg-white/95 border-gray-200"
              : "bg-gray-900/95 border-gray-700"
          }`}
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg font-medium transition-colors ${
              theme === "light"
                ? "text-gray-700 hover:bg-gray-200"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <h2
            className={`text-3xl font-bold text-center mb-8 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Select Your Role
          </h2>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {!selectedUserType ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <button
                onClick={() => handleUserTypeSelect("Survivor")}
                className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg border-2 transition-all duration-200
                  ${
                    theme === "light"
                      ? "bg-white hover:bg-indigo-50 border-gray-300 hover:border-indigo-500"
                      : "bg-gray-800 hover:bg-indigo-900/30 border-gray-600 hover:border-indigo-500"
                  }
                  ${theme === "light" ? "text-gray-800" : "text-white"}`}
              >
                <User size={48} className="mb-3 sm:mb-4 text-indigo-600" />
                <span className="text-lg sm:text-xl font-semibold">Survivor</span>
                <p
                  className={`text-xs sm:text-sm mt-2 text-center ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  I need help and resources.
                </p>
              </button>
              <button
                onClick={() => handleUserTypeSelect("NGO")}
                className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg border-2 transition-all duration-200
                  ${
                    theme === "light"
                      ? "bg-white hover:bg-indigo-50 border-gray-300 hover:border-indigo-500"
                      : "bg-gray-800 hover:bg-indigo-900/30 border-gray-600 hover:border-indigo-500"
                  }
                  ${theme === "light" ? "text-gray-800" : "text-white"}`}
              >
                <Building size={48} className="mb-3 sm:mb-4 text-green-600" />
                <span className="text-lg sm:text-xl font-semibold">NGO</span>
                <p
                  className={`text-xs sm:text-sm mt-2 text-center ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  I provide aid and support.
                </p>
              </button>
              <button
                onClick={() => handleUserTypeSelect("Volunteer")}
                className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg border-2 transition-all duration-200
                  ${
                    theme === "light"
                      ? "bg-white hover:bg-indigo-50 border-gray-300 hover:border-indigo-500"
                      : "bg-gray-800 hover:bg-indigo-900/30 border-gray-600 hover:border-indigo-500"
                  }
                  ${theme === "light" ? "text-gray-800" : "text-white"}`}
              >
                <HandHeart size={48} className="mb-3 sm:mb-4 text-yellow-600" />
                <span className="text-lg sm:text-xl font-semibold">Volunteer</span>
                <p
                  className={`text-xs sm:text-sm mt-2 text-center ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  I want to help.
                </p>
              </button>
              <button
                onClick={() => handleUserTypeSelect("Supplier")}
                className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg border-2 transition-all duration-200
                  ${
                    theme === "light"
                      ? "bg-white hover:bg-indigo-50 border-gray-300 hover:border-indigo-500"
                      : "bg-gray-800 hover:bg-indigo-900/30 border-gray-600 hover:border-indigo-500"
                  }
                  ${theme === "light" ? "text-gray-800" : "text-white"}`}
              >
                <Package size={48} className="mb-3 sm:mb-4 text-blue-600" />
                <span className="text-lg sm:text-xl font-semibold">Supplier</span>
                <p
                  className={`text-xs sm:text-sm mt-2 text-center ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  I provide relief supplies.
                </p>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h3
                className={`text-2xl font-bold mb-4 ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                {selectedUserType === "NGO" ? "NGO Details" : selectedUserType === "Supplier" ? "Supplier Details" : "Confirm Role"}
              </h3>

              {selectedUserType === "NGO" && (
                <>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      NGO Name *
                    </label>
                    <input
                      type="text"
                      name="ngoName"
                      value={ngoDetails.ngoName}
                      onChange={handleNgoChange}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        theme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-gray-600 bg-gray-800 text-white"
                      }`}
                      placeholder="e.g., Red Cross"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Location (Latitude & Longitude) *
                    </label>
                    <div className="flex gap-4 justify-between mb-2">
                      <input
                        type="text"
                        name="ngoLatitude"
                        value={ngoDetails.ngoLatitude}
                        onChange={handleNgoChange}
                        className={`w-1/2 px-3 py-2 border rounded-lg ${
                          theme === "light"
                            ? "border-gray-300 bg-white"
                            : "border-gray-600 bg-gray-800 text-white"
                        }`}
                        placeholder="56.76531 N"
                        required
                      />
                      <input
                        type="text"
                        name="ngoLongitude"
                        value={ngoDetails.ngoLongitude}
                        onChange={handleNgoChange}
                        className={`w-1/2 px-3 py-2 border rounded-lg ${
                          theme === "light"
                            ? "border-gray-300 bg-white"
                            : "border-gray-600 bg-gray-800 text-white"
                        }`}
                        placeholder="23.72331 E"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleGetCurrentLocation(true)}
                      className={`text-sm px-3 py-1 rounded ${
                        theme === "light"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-blue-900 text-blue-300 hover:bg-blue-800"
                      }`}
                    >
                      📍 Use my current location
                    </button>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Contact Information *
                    </label>
                    <input
                      type="text"
                      name="ngoContact"
                      value={ngoDetails.ngoContact}
                      onChange={handleNgoChange}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        theme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-gray-600 bg-gray-800 text-white"
                      }`}
                      placeholder="e.g., 9876543210"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Description (Optional)
                    </label>
                    <textarea
                      name="ngoDescription"
                      value={ngoDetails.ngoDescription}
                      onChange={handleNgoChange}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        theme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-gray-600 bg-gray-800 text-white"
                      }`}
                      placeholder="Briefly describe your NGO's mission and services."
                    />
                  </div>
                </>
              )}

              {selectedUserType === "Supplier" && (
                <>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Company/Business Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={supplierDetails.name}
                      onChange={handleSupplierChange}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        theme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-gray-600 bg-gray-800 text-white"
                      }`}
                      placeholder="e.g., ABC Supplies Ltd."
                      required
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={supplierDetails.phone}
                      onChange={handleSupplierChange}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        theme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-gray-600 bg-gray-800 text-white"
                      }`}
                      placeholder="e.g., +1234567890"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={supplierDetails.email}
                      onChange={handleSupplierChange}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        theme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-gray-600 bg-gray-800 text-white"
                      }`}
                      placeholder="e.g., contact@abcsupplies.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Business Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={supplierDetails.address}
                      onChange={handleSupplierChange}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        theme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-gray-600 bg-gray-800 text-white"
                      }`}
                      placeholder="e.g., 123 Main St, City, Country"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Location (Latitude & Longitude) *
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        name="latitude"
                        value={supplierDetails.latitude}
                        onChange={handleSupplierChange}
                        className={`flex-1 px-3 py-2 border rounded-lg ${
                          theme === "light"
                            ? "border-gray-300 bg-white"
                            : "border-gray-600 bg-gray-800 text-white"
                        }`}
                        placeholder="Latitude"
                        required
                      />
                      <input
                        type="text"
                        name="longitude"
                        value={supplierDetails.longitude}
                        onChange={handleSupplierChange}
                        className={`flex-1 px-3 py-2 border rounded-lg ${
                          theme === "light"
                            ? "border-gray-300 bg-white"
                            : "border-gray-600 bg-gray-800 text-white"
                        }`}
                        placeholder="Longitude"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleGetCurrentLocation(false)}
                      className={`text-sm px-3 py-1 rounded ${
                        theme === "light"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-blue-900 text-blue-300 hover:bg-blue-800"
                      }`}
                    >
                      📍 Use my current location
                    </button>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Estimated Delivery Time (hours)
                    </label>
                    <input
                      type="number"
                      name="deliveryTimeEstimate"
                      value={supplierDetails.deliveryTimeEstimate}
                      onChange={handleSupplierChange}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        theme === "light"
                          ? "border-gray-300 bg-white"
                          : "border-gray-600 bg-gray-800 text-white"
                      }`}
                      placeholder="24"
                      min="1"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setSelectedUserType("")}
                  className={`flex-1 px-6 py-3 border rounded-lg transition ${
                    theme === "light"
                      ? "border-gray-300 hover:bg-gray-50 text-gray-700"
                      : "border-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Confirm Role"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
