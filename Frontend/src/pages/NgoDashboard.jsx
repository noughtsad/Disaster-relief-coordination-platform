import React, { useState, useContext, useEffect } from "react";
import {
  Home,
  Heart,
  List,
  BarChart2,
  MessageSquare,
  User,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Send,
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { updateRequestStatus, setLoading as setRequestLoading, setError as setRequestError, clearError as clearRequestError } from '../store/requestSlice';
import Navbar from "../components/Navbar";

import { ThemeContext } from "../context/ThemeContext";

export default function NgoDashboard() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);
  const { donations } = useSelector((state) => state.donations);
  const { communications } = useSelector((state) => state.communications);
  const { ngoProfile } = useSelector((state) => state.ngo);
  const { user } = useSelector((state) => state.app);

  const [activeSection, setActiveSection] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  }, [dispatch, ngoProfile.ngoName, user?._id]);

  const HomeSection = () => (
    <div>
      <h1
        className={`text-3xl font-bold mb-6 ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}
      >
        Welcome back, {ngoProfile.ngoName || 'NGO'}
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                Total Donations
              </p>
              <h2
                className={`text-2xl font-bold mt-2 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                $125,000
              </h2>
            </div>
            <DollarSign className="w-10 h-10 text-green-500" />
          </div>
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                Active Campaigns
              </p>
              <h2
                className={`text-2xl font-bold mt-2 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                8
              </h2>
            </div>
            <Heart className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                Volunteers
              </p>
              <h2
                className={`text-2xl font-bold mt-2 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                245
              </h2>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                Pending Requests
              </p>
              <h2
                className={`text-2xl font-bold mt-2 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                12
              </h2>
            </div>
            <AlertCircle className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-2 gap-6">
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
            Recent Donations
          </h3>
          <div className="space-y-3">
            {donations.slice(0, 3).map((donation) => (
              <div
                key={donation.id}
                className={`flex justify-between items-center p-3 rounded ${
                  theme === "light" ? "bg-gray-50" : "bg-gray-800"
                }`}
              >
                <div>
                  <p
                    className={`font-medium ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {donation.donor}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {donation.campaign}
                  </p>
                </div>
                <span className="text-green-600 font-semibold">
                  ${donation.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

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
            Urgent Requests
          </h3>
          <div className="space-y-3">
            {requests
              .filter(
                (req) => req.urgency === "High" || req.urgency === "Critical"
              )
              .map((request) => (
                <div
                  key={request.id}
                  className={`p-3 rounded border-l-4 ${
                    request.urgency === "Critical"
                      ? "border-red-500"
                      : "border-orange-500"
                  } ${theme === "light" ? "bg-gray-50" : "bg-gray-800"}`}
                >
                  <p
                    className={`font-medium ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {request.title}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {request.location}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ManageDonationsSection = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1
          className={`text-3xl font-bold ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Manage Donations
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Donation
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
              theme === "light"
                ? "bg-white border-gray-300"
                : "bg-gray-800 border-gray-600 text-white"
            }`}
          />
        </div>
        <button
          className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
            theme === "light"
              ? "border-gray-300 hover:bg-gray-50"
              : "border-gray-600 hover:bg-gray-700 text-white"
          }`}
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Donations Table */}
      <div
        className={`rounded-xl shadow overflow-hidden ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <table className="w-full">
          <thead
            className={`${theme === "light" ? "bg-gray-50" : "bg-gray-800"}`}
          >
            <tr>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Donor
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Amount/Items
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Campaign
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Date
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Status
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-medium ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              theme === "light" ? "divide-gray-200" : "divide-gray-700"
            }`}
          >
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td
                  className={`px-6 py-4 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {donation.donor}
                </td>
                <td
                  className={`px-6 py-4 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {donation.type === "Money"
                    ? `$${donation.amount}`
                    : `${donation.amount} ${donation.type}`}
                </td>
                <td
                  className={`px-6 py-4 ${
                    theme === "light" ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  {donation.campaign}
                </td>
                <td
                  className={`px-6 py-4 ${
                    theme === "light" ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  {donation.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      donation.status === "Received"
                        ? "bg-green-100 text-green-800"
                        : donation.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ViewRequestsSection = () => {
    const handleMarkComplete = async (id) => {
      dispatch(setRequestLoading(true));
      dispatch(clearRequestError());
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        dispatch(updateRequestStatus({ id, status: 'Completed' }));
        alert('Request marked as complete!');
      } catch (err) {
        dispatch(setRequestError(err.message));
      } finally {
        dispatch(setRequestLoading(false));
      }
    };

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-3xl font-bold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            View Requests
          </h1>
          {/* New Request button might navigate to a form or modal */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Request
          </button>
        </div>

        {/* Request Cards */}
        <div className="grid gap-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className={`p-6 rounded-xl shadow ${
                theme === "light" ? "bg-white" : "bg-gray-900"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {request.type} {/* Using type from requestSlice */}
                  </h3>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span
                        className={`text-sm ${
                          theme === "light" ? "text-gray-600" : "text-gray-300"
                        }`}
                      >
                        {request.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span
                        className={`text-sm ${
                          theme === "light" ? "text-gray-600" : "text-gray-300"
                        }`}
                      >
                        {request.date}
                      </span>
                    </div>
                  </div>
                  <p
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {request.description} {/* Using description from requestSlice */}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      request.urgency === "High"
                        ? "bg-red-100 text-red-800"
                        : request.urgency === "Medium"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {request.urgency} Priority
                  </span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      request.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Approved"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Details
                </button>
                <button
                  className={`px-4 py-2 border rounded hover:bg-gray-50 ${
                    theme === "light"
                      ? "border-gray-300"
                      : "border-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  Edit
                </button>
                {request.status !== 'Completed' && (
                  <button
                    onClick={() => handleMarkComplete(request.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CommunicationsSection = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1
          className={`text-3xl font-bold ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Communications
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Send className="w-4 h-4" />
          New Message
        </button>
      </div>

      {/* Communication Types */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div
          className={`p-6 rounded-xl shadow text-center ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <Mail className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Email Campaigns
          </h3>
          <p
            className={`text-sm mb-4 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Send newsletters and updates
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Create Email
          </button>
        </div>

        <div
          className={`p-6 rounded-xl shadow text-center ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <MessageSquare className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            SMS Alerts
          </h3>
          <p
            className={`text-sm mb-4 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Quick notifications to volunteers
          </p>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Send SMS
          </button>
        </div>

        <div
          className={`p-6 rounded-xl shadow text-center ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <Users className="w-12 h-12 text-purple-500 mx-auto mb-3" />
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Social Media
          </h3>
          <p
            className={`text-sm mb-4 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Share updates and campaigns
          </p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Post Update
          </button>
        </div>
      </div>

      {/* Recent Communications */}
      <div
        className={`rounded-xl shadow overflow-hidden ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <div
          className={`px-6 py-4 border-b ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <h3
            className={`text-lg font-semibold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Recent Communications
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {communications.map((comm) => (
            <div
              key={comm.id}
              className={`p-6 flex justify-between items-center ${
                theme === "light" ? "" : "divide-gray-700"
              }`}
            >
              <div className="flex items-center gap-4">
                {comm.type === "Email" && (
                  <Mail className="w-5 h-5 text-blue-500" />
                )}
                {comm.type === "SMS" && (
                  <MessageSquare className="w-5 h-5 text-green-500" />
                )}
                {comm.type === "Newsletter" && (
                  <Users className="w-5 h-5 text-purple-500" />
                )}
                <div>
                  <h4
                    className={`font-medium ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {comm.subject}
                  </h4>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    To: {comm.recipient}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-sm ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {comm.date}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    comm.status === "Sent"
                      ? "bg-green-100 text-green-800"
                      : comm.status === "Scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {comm.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfileSection = () => {
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

  const ImpactTrackingSection = () => (
    <div>
      <p
        className={`mb-6 ${
          theme === "light" ? "text-gray-600" : "text-gray-300"
        }`}
      >
        Monitor the progress and effectiveness of your relief efforts in
        real-time.
      </p>

      {/* Overall Impact */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
            Beneficiaries Served
          </p>
          <h2
            className={`text-2xl font-bold mt-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            12,500
          </h2>
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
            Resources Distributed
          </p>
          <h2
            className={`text-2xl font-bold mt-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            500 Tons
          </h2>
        </div>
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
            Progress Towards Goals
          </p>
          <h2
            className={`text-2xl font-bold mt-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            75%
          </h2>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <p
            className={`mb-2 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Beneficiaries Reached by Campaign
          </p>
          <h2
            className={`text-2xl font-bold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            5,000
          </h2>
          <p className="text-green-600 text-sm mt-1">Total +15%</p>
          <div className="flex space-x-4 mt-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-24 bg-blue-200 rounded"></div>
              <p
                className={`text-sm mt-2 ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Campaign A
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-16 bg-blue-400 rounded"></div>
              <p
                className={`text-sm mt-2 ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Campaign B
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-20 bg-blue-600 rounded"></div>
              <p
                className={`text-sm mt-2 ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Campaign C
              </p>
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl shadow ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <p
            className={`mb-2 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Resource Distribution Over Time
          </p>
          <h2
            className={`text-2xl font-bold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            200 Tons
          </h2>
          <p className="text-green-600 text-sm mt-1">Last 6 Months +10%</p>
          <div className="h-32 flex items-end mt-4">
            <div
              className={`w-full border-b flex justify-between text-xs ${
                theme === "light"
                  ? "border-gray-200 text-gray-500"
                  : "border-gray-600 text-gray-400"
              }`}
            >
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div
        className={`p-6 rounded-xl shadow ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <h2
          className={`text-lg font-bold mb-4 ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Detailed Reports
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`border-b ${
                theme === "light"
                  ? "text-gray-600 border-gray-200"
                  : "text-gray-400 border-gray-700"
              }`}
            >
              <th className="py-2">Campaign</th>
              <th>Beneficiaries Served</th>
              <th>Resources Distributed</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody
            className={theme === "light" ? "text-gray-900" : "text-gray-100"}
          >
            <tr
              className={`border-b ${
                theme === "light" ? "border-gray-200" : "border-gray-700"
              }`}
            >
              <td className="py-3">Campaign A: Flood Relief</td>
              <td>5,000</td>
              <td>200 Tons</td>
              <td>
                <div
                  className={`w-32 h-2 rounded ${
                    theme === "light" ? "bg-gray-200" : "bg-gray-700"
                  }`}
                >
                  <div className="bg-blue-600 h-2 rounded w-3/4"></div>
                </div>
              </td>
              <td>Active</td>
            </tr>
            <tr
              className={`border-b ${
                theme === "light" ? "border-gray-200" : "border-gray-700"
              }`}
            >
              <td className="py-3">Campaign B: Earthquake Recovery</td>
              <td>4,500</td>
              <td>150 Tons</td>
              <td>
                <div
                  className={`w-32 h-2 rounded ${
                    theme === "light" ? "bg-gray-200" : "bg-gray-700"
                  }`}
                >
                  <div className="bg-blue-600 h-2 rounded w-3/5"></div>
                </div>
              </td>
              <td>Active</td>
            </tr>
            <tr>
              <td className="py-3">Campaign C: Hurricane Assistance</td>
              <td>3,000</td>
              <td>150 Tons</td>
              <td>
                <div
                  className={`w-32 h-2 rounded ${
                    theme === "light" ? "bg-gray-200" : "bg-gray-700"
                  }`}
                >
                  <div className="bg-blue-600 h-2 rounded w-[90%]"></div>
                </div>
              </td>
              <td>Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />;
      case "donations":
        return <ManageDonationsSection />;
      case "requests":
        return <ViewRequestsSection />;
      case "impact":
        return <ImpactTrackingSection />;
      case "communications":
        return <CommunicationsSection />;
      case "profile":
        return <ProfileSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* isLoggedIn prop removed */}
      <div
        className={`flex h-screen ${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
        {/* Sidebar */}
        <aside
          className={`w-64 backdrop-blur border-r p-6 flex flex-col shadow-md ${
            theme === "light"
              ? "bg-white/90 border-gray-200"
              : "bg-gray-900/90 border-gray-700"
          }`}
        >
          {" "}
          <div
            className={`flex items-center px-6 py-4 border-b ${
              theme === "light" ? "border-gray-200" : "border-gray-700"
            }`}
          >
            <img
              src="https://i.pravatar.cc/50?img=12"
              alt="NGO Logo"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <h2
                className={`font-semibold ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                {ngoProfile.ngoName || 'NGO Name'}
              </h2>
              <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                {user?.name || 'NGO Owner'}
              </span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-4">
            <button
              onClick={() => setActiveSection("home")}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "home"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <Home className="w-5 h-5 mr-3" /> Home
            </button>
            <button
              onClick={() => setActiveSection("donations")}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "donations"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <Heart className="w-5 h-5 mr-3" /> Manage Donations
            </button>
            <button
              onClick={() => setActiveSection("requests")}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "requests"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <List className="w-5 h-5 mr-3" /> View Requests
            </button>
            <button
              onClick={() => setActiveSection("impact")}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "impact"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <BarChart2 className="w-5 h-5 mr-3" /> Impact Tracking
            </button>
            <button
              onClick={() => setActiveSection("communications")}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "communications"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-3" /> Communications
            </button>
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full flex items-center text-left hover:text-blue-600 ${
                activeSection === "profile"
                  ? "text-blue-600 font-semibold"
                  : theme === "light"
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}
            >
              <User className="w-5 h-5 mr-3" /> Profile
            </button>
          </nav>
          <div className="p-4">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              New Campaign
            </button>
            <p
              className={`text-sm mt-3 text-center ${
                theme === "light" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Help and Docs
            </p>
          </div>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 p-8 overflow-y-auto">{renderSection()}</main>
      </div>
    </div>
  );
};
