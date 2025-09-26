import React, { useContext } from "react";
import {
  Home,
  Heart,
  List,
  BarChart2,
  MessageSquare,
  User,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContext"

const NgoDashboard = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
      <Navbar />
      <div className={`flex h-screen ${theme === "light" ? "bg-gray-50" : "bg-gray-800"}`}>
        {/* Sidebar */}
        <aside className={`w-64 shadow-md flex flex-col ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
          <div className={`flex items-center px-6 py-4 border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
            <img
              src="https://i.pravatar.cc/50?img=12"
              alt="NGO Logo"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <h2 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>Relief United</h2>
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-4">
            <a
              href="#"
              className={`flex items-center hover:text-blue-600 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
            >
              <Home className="w-5 h-5 mr-3" /> Home
            </a>
            <a
              href="#"
              className={`flex items-center hover:text-blue-600 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
            >
              <Heart className="w-5 h-5 mr-3" /> Manage Donations
            </a>
            <a
              href="#"
              className={`flex items-center hover:text-blue-600 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
            >
              <List className="w-5 h-5 mr-3" /> View Requests
            </a>
            <a
              href="#"
              className="flex items-center text-blue-600 font-semibold"
            >
              <BarChart2 className="w-5 h-5 mr-3" /> Impact Tracking
            </a>
            <a
              href="#"
              className={`flex items-center hover:text-blue-600 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
            >
              <MessageSquare className="w-5 h-5 mr-3" /> Communications
            </a>
            <a
              href="#"
              className={`flex items-center hover:text-blue-600 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
            >
              <User className="w-5 h-5 mr-3" /> Profile
            </a>
          </nav>
          <div className="p-4">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              New Campaign
            </button>
            <p className={`text-sm mt-3 text-center ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
              Help and Docs
            </p>
          </div>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 p-8 overflow-y-auto">
          <p className={`mb-6 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            Monitor the progress and effectiveness of your relief efforts in
            real-time.
          </p>

          {/* Overall Impact */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-xl shadow ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
              <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>Beneficiaries Served</p>
              <h2 className={`text-2xl font-bold mt-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>12,500</h2>
            </div>
            <div className={`p-6 rounded-xl shadow ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
              <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>Resources Distributed</p>
              <h2 className={`text-2xl font-bold mt-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>500 Tons</h2>
            </div>
            <div className={`p-6 rounded-xl shadow ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
              <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>Progress Towards Goals</p>
              <h2 className={`text-2xl font-bold mt-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>75%</h2>
            </div>
          </div>

          {/* Campaign Performance */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className={`p-6 rounded-xl shadow ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
              <p className={`mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                Beneficiaries Reached by Campaign
              </p>
              <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>5,000</h2>
              <p className="text-green-600 text-sm mt-1">Total +15%</p>
              <div className="flex space-x-4 mt-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-24 bg-blue-200 rounded"></div>
                  <p className={`text-sm mt-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Campaign A</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-16 bg-blue-400 rounded"></div>
                  <p className={`text-sm mt-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Campaign B</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-20 bg-blue-600 rounded"></div>
                  <p className={`text-sm mt-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Campaign C</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl shadow ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
              <p className={`mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                Resource Distribution Over Time
              </p>
              <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>200 Tons</h2>
              <p className="text-green-600 text-sm mt-1">Last 6 Months +10%</p>
              <div className="h-32 flex items-end mt-4">
                <div className={`w-full border-b flex justify-between text-xs ${theme === "light" ? "border-gray-200 text-gray-500" : "border-gray-600 text-gray-400"}`}>
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
          <div className={`p-6 rounded-xl shadow ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
            <h2 className={`text-lg font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>Detailed Reports</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b ${theme === "light" ? "text-gray-600 border-gray-200" : "text-gray-400 border-gray-700"}`}>
                  <th className="py-2">Campaign</th>
                  <th>Beneficiaries Served</th>
                  <th>Resources Distributed</th>
                  <th>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className={theme === "light" ? "text-gray-900" : "text-gray-100"}>
                <tr className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                  <td className="py-3">Campaign A: Flood Relief</td>
                  <td>5,000</td>
                  <td>200 Tons</td>
                  <td>
                    <div className={`w-32 h-2 rounded ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`}>
                      <div className="bg-blue-600 h-2 rounded w-3/4"></div>
                    </div>
                  </td>
                  <td>Active</td>
                </tr>
                <tr className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                  <td className="py-3">Campaign B: Earthquake Recovery</td>
                  <td>4,500</td>
                  <td>150 Tons</td>
                  <td>
                    <div className={`w-32 h-2 rounded ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`}>
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
                    <div className={`w-32 h-2 rounded ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`}>
                      <div className="bg-blue-600 h-2 rounded w-[90%]"></div>
                    </div>
                  </td>
                  <td>Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default NgoDashboard;