import React, { useContext } from "react";
import { useSelector } from 'react-redux';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Users 
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const CommunicationsSection = () => {
  const { theme } = useContext(ThemeContext);
  const { communications } = useSelector((state) => state.communications);

  return (
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
};

export default CommunicationsSection;