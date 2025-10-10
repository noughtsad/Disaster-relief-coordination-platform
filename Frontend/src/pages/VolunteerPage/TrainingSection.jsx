import React, { useContext } from "react";
import { 
  BookOpen,
  CheckCircle,
  Clock,
  Award
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const TrainingSection = ({ trainingModules }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Training & Certification</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <BookOpen className="mr-2 h-4 w-4" />
          Browse Courses
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trainingModules.map((module) => (
          <div key={module.id} className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{module.title}</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Duration: {module.duration}</p>
              </div>
              <div className="flex items-center space-x-2">
                {module.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-gray-400" />
                )}
                {module.certificate && (
                  <Award className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </div>

            <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-4`}>{module.description}</p>

            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                module.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {module.completed ? 'Completed' : 'Available'}
              </span>
              
              <div className="flex space-x-2">
                {module.completed ? (
                  <>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View Certificate</button>
                    <button className="text-sm text-green-600 hover:text-green-800">Retake</button>
                  </>
                ) : (
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Start Course
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingSection;