import React, { useContext } from "react";
import { Home, PlusCircle, List, Info, User } from "lucide-react";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContext";

export default function SurvivorDashboard() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`w-64 backdrop-blur border-r p-6 flex flex-col shadow-md ${
          theme === "light" 
            ? "bg-white/90 border-gray-200" 
            : "bg-gray-900/90 border-gray-700"
        }`}>
          {/* Profile */}
          <div className="flex items-center space-x-3 mb-8">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Emily Carter
              </p>
              <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                Survivor
              </span>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex flex-col space-y-2">
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-md"
            >
              <Home size={18} />
              <span>Home</span>
            </a>
            <a
              href="#"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                theme === "light"
                  ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  : "text-gray-300 hover:bg-indigo-900/30 hover:text-indigo-400"
              }`}
            >
              <PlusCircle size={18} />
              <span>Report Need</span>
            </a>
            <a
              href="#"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                theme === "light"
                  ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  : "text-gray-300 hover:bg-indigo-900/30 hover:text-indigo-400"
              }`}
            >
              <List size={18} />
              <span>Requests</span>
            </a>
            <a
              href="#"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                theme === "light"
                  ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  : "text-gray-300 hover:bg-indigo-900/30 hover:text-indigo-400"
              }`}
            >
              <Info size={18} />
              <span>Emergency Info</span>
            </a>
            <a
              href="#"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                theme === "light"
                  ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  : "text-gray-300 hover:bg-indigo-900/30 hover:text-indigo-400"
              }`}
            >
              <User size={18} />
              <span>Profile</span>
            </a>
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 p-8">
          <h2 className={`text-2xl font-bold drop-shadow mb-6 ${
            theme === "light" ? "text-black" : "text-white"
          }`}>
            Dashboard
          </h2>

          {/* Requests Table */}
          <div className={`backdrop-blur border rounded-xl overflow-hidden mb-8 shadow-lg ${
            theme === "light"
              ? "bg-white/95 border-gray-200"
              : "bg-gray-900/95 border-gray-700"
          }`}>
            <div className={`p-4 border-b ${
              theme === "light"
                ? "border-gray-200 bg-gray-50"
                : "border-gray-700 bg-gray-800"
            }`}>
              <h3 className={`font-semibold text-lg ${
                theme === "light" ? "text-indigo-700" : "text-indigo-400"
              }`}>
                Your Requests
              </h3>
            </div>
            <table className="w-full text-sm text-left">
              <thead className={`font-medium ${
                theme === "light"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-800 text-gray-300"
              }`}>
                <tr>
                  <th className="px-6 py-3">Request</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className={theme === "light" ? "text-gray-900" : "text-gray-100"}>
                <tr className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                  <td className="px-6 py-3">Shelter</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      theme === "light"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-700 text-gray-300"
                    }`}>
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-3">01-01-2025</td>
                </tr>
                <tr className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                  <td className="px-6 py-3">Food</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      theme === "light"
                        ? "bg-green-100 text-green-700"
                        : "bg-green-900/50 text-green-400"
                    }`}>
                      Approved
                    </span>
                  </td>
                  <td className="px-6 py-3">01-01-2025</td>
                </tr>
                <tr className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                  <td className="px-6 py-3">Medical Supplies</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      theme === "light"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-blue-900/50 text-blue-400"
                    }`}>
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-3">01-01-2025</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Emergency Information */}
          <h3 className={`font-semibold text-lg drop-shadow mb-4 ${
            theme === "light" ? "text-black" : "text-white"
          }`}>
            Emergency Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Emergency Contacts */}
            <div className={`backdrop-blur border rounded-xl p-5 flex flex-col justify-between shadow-lg ${
              theme === "light"
                ? "bg-white/95 border-gray-200"
                : "bg-gray-900/95 border-gray-700"
            }`}>
              <div>
                <h4 className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  Emergency Contacts
                </h4>
                <p className={`text-sm mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  Important phone numbers for emergency services.
                </p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
                View
              </button>
            </div>

            {/* Safety Tips */}
            <div className={`backdrop-blur border rounded-xl p-5 flex flex-col justify-between shadow-lg ${
              theme === "light"
                ? "bg-white/95 border-gray-200"
                : "bg-gray-900/95 border-gray-700"
            }`}>
              <div>
                <h4 className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  Safety Tips
                </h4>
                <p className={`text-sm mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  Essential safety guidelines during and after a disaster.
                </p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
                Read
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}