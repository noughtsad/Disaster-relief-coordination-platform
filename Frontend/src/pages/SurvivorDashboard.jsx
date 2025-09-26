import React from "react";
import { Home, PlusCircle, List, Info, User } from "lucide-react";

export default function SurvivorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white/90 backdrop-blur border-b border-gray-200 flex justify-between items-center px-6 py-3 shadow-md">
        <h1 className="text-lg font-bold text-indigo-600">CrisisConnect</h1>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
            About
          </a>
          <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            Donate
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white/90 backdrop-blur border-r border-gray-200 p-6 flex flex-col shadow-md">
          {/* Profile */}
          <div className="flex items-center space-x-3 mb-8">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">Emily Carter</p>
              <span className="text-xs text-gray-500">Survivor</span>
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
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              <PlusCircle size={18} />
              <span>Report Need</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              <List size={18} />
              <span>Requests</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              <Info size={18} />
              <span>Emergency Info</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              <User size={18} />
              <span>Profile</span>
            </a>
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-white drop-shadow mb-6">
            Dashboard
          </h2>

          {/* Requests Table */}
          <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-lg">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-lg text-indigo-700">
                Your Requests
              </h3>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-medium">
                <tr>
                  <th className="px-6 py-3">Request</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-6 py-3">Shelter</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-3">01-01-2025</td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-3">Food</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                      Approved
                    </span>
                  </td>
                  <td className="px-6 py-3">01-01-2025</td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-3">Medical Supplies</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-3">01-01-2025</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Emergency Information */}
          <h3 className="font-semibold text-lg text-white drop-shadow mb-4">
            Emergency Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Emergency Contacts */}
            <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <h4 className="font-medium text-gray-900">Emergency Contacts</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Important phone numbers for emergency services.
                </p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
                View
              </button>
            </div>

            {/* Safety Tips */}
            <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <h4 className="font-medium text-gray-900">Safety Tips</h4>
                <p className="text-sm text-gray-600 mb-4">
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
