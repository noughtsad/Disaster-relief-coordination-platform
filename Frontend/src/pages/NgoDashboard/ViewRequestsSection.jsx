import React, { useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { 
  Plus, 
  MapPin, 
  Calendar 
} from "lucide-react";
import { 
  updateRequestStatus, 
  setLoading as setRequestLoading, 
  setError as setRequestError, 
  clearError as clearRequestError 
} from '../../store/requestSlice';
import { ThemeContext } from "../../context/ThemeContext";

const ViewRequestsSection = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);

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

export default ViewRequestsSection;