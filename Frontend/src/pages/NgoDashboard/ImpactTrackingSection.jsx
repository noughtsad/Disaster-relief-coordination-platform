import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ImpactTrackingSection = () => {
  const { theme } = useContext(ThemeContext);

  return (
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
};

export default ImpactTrackingSection;