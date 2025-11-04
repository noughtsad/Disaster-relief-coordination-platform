import React, { useContext, useState } from "react";
import { 
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  ExternalLink,
  X,
  Play,
  FileText
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const TrainingSection = ({ trainingModules, setTrainingModules }) => {
  const { theme } = useContext(ThemeContext);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Training resources with external links and quizzes
  const trainingData = {
    1: {
      title: "Emergency Response Basics",
      resources: [
        { type: "video", title: "FEMA Emergency Response Training", url: "https://training.fema.gov/is/courseoverview.aspx?code=IS-100.c", duration: "3 hours" },
        { type: "article", title: "Red Cross Emergency Response Guide", url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies.html", duration: "30 min read" },
        { type: "video", title: "WHO Emergency Response Framework", url: "https://www.who.int/health-topics/emergencies", duration: "45 min" }
      ],
      quiz: [
        {
          id: 1,
          question: "What is the first priority in any emergency response?",
          options: ["Evacuate everyone", "Ensure safety of responders and victims", "Call for backup", "Document the scene"],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "What does the acronym 'RACE' stand for in emergency procedures?",
          options: ["Run, Alert, Contain, Escape", "Rescue, Alarm, Confine, Extinguish", "React, Assess, Call, Evacuate", "Remove, Alert, Clear, Exit"],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "How often should emergency response plans be reviewed?",
          options: ["Once a year", "Every 6 months", "Only when regulations change", "At least annually and after any incident"],
          correctAnswer: 3
        }
      ]
    },
    2: {
      title: "First Aid & CPR",
      resources: [
        { type: "video", title: "Red Cross CPR Training", url: "https://www.redcross.org/take-a-class/cpr", duration: "4 hours" },
        { type: "article", title: "Mayo Clinic First Aid Guide", url: "https://www.mayoclinic.org/first-aid", duration: "1 hour read" },
        { type: "video", title: "AHA CPR & First Aid", url: "https://cpr.heart.org/", duration: "3 hours" }
      ],
      quiz: [
        {
          id: 1,
          question: "What is the correct compression-to-breath ratio for adult CPR?",
          options: ["15:2", "30:2", "20:1", "10:2"],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "How deep should chest compressions be for an adult?",
          options: ["At least 1 inch", "At least 2 inches", "At least 3 inches", "At least 4 inches"],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "What should you do first if someone is choking and cannot speak?",
          options: ["Call 911 immediately", "Give them water", "Perform abdominal thrusts (Heimlich maneuver)", "Pat their back gently"],
          correctAnswer: 2
        }
      ]
    },
    3: {
      title: "Disaster Communication",
      resources: [
        { type: "article", title: "FEMA Crisis Communication", url: "https://www.fema.gov/emergency-managers/practitioners/crisis-communications", duration: "45 min read" },
        { type: "video", title: "WHO Risk Communication", url: "https://www.who.int/emergencies/risk-communications", duration: "1.5 hours" },
        { type: "article", title: "CDC Emergency Communication", url: "https://www.cdc.gov/emergency-preparedness/communication/index.html", duration: "30 min read" }
      ],
      quiz: [
        {
          id: 1,
          question: "What is the most important principle of crisis communication?",
          options: ["Speed over accuracy", "Accuracy and transparency", "Keeping information confidential", "Only communicating good news"],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "When should you communicate during a disaster?",
          options: ["Only when asked", "After everything is resolved", "Early, often, and consistently", "Only to media"],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "What should crisis messages prioritize?",
          options: ["Technical details", "Blame and responsibility", "Public safety and actionable information", "Political statements"],
          correctAnswer: 2
        }
      ]
    },
    4: {
      title: "Psychological First Aid",
      resources: [
        { type: "article", title: "WHO Psychological First Aid Guide", url: "https://www.who.int/publications/i/item/9789241548205", duration: "2 hours read" },
        { type: "video", title: "Red Cross Psychological First Aid", url: "https://www.redcross.org/take-a-class/cpr/psychological-first-aid", duration: "3 hours" },
        { type: "article", title: "SAMHSA Disaster Mental Health", url: "https://www.samhsa.gov/dtac", duration: "1 hour read" }
      ],
      quiz: [
        {
          id: 1,
          question: "What is the primary goal of Psychological First Aid (PFA)?",
          options: ["Diagnose mental health conditions", "Provide therapy", "Reduce initial distress and support adaptive functioning", "Prescribe medication"],
          correctAnswer: 2
        },
        {
          id: 2,
          question: "Which is NOT a core action of PFA?",
          options: ["Contact and engagement", "Safety and comfort", "Deep psychological analysis", "Connection with social supports"],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "When providing PFA, you should:",
          options: ["Force people to talk about trauma", "Listen actively and show respect", "Give advice based on your experience", "Share your own trauma"],
          correctAnswer: 1
        }
      ]
    }
  };

  const handleStartCourse = (module) => {
    setSelectedModule(module);
    setShowQuiz(false);
    setQuizSubmitted(false);
    setQuizAnswers({});
  };

  const handleTakeQuiz = () => {
    setShowQuiz(true);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex
    });
  };

  const handleSubmitQuiz = () => {
    const moduleData = trainingData[selectedModule.id];
    let correct = 0;
    
    moduleData.quiz.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });

    const score = (correct / moduleData.quiz.length) * 100;
    setQuizScore(score);
    setQuizSubmitted(true);

    // If passed (70% or higher), mark module as completed
    if (score >= 70) {
      setTrainingModules(prev => prev.map(mod => 
        mod.id === selectedModule.id 
          ? { ...mod, completed: true, certificate: true }
          : mod
      ));
    }
  };

  const handleCloseModal = () => {
    setSelectedModule(null);
    setShowQuiz(false);
    setQuizSubmitted(false);
  };

  const handleRetake = (module) => {
    handleStartCourse(module);
  };

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
                    <button 
                      onClick={() => alert('Certificate downloaded!')}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      View Certificate
                    </button>
                    <button 
                      onClick={() => handleRetake(module)}
                      className="text-sm text-green-600 hover:text-green-800"
                    >
                      Retake
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleStartCourse(module)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Course
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Training Module Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
              <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {selectedModule.title}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {!showQuiz ? (
                <>
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      Learning Resources
                    </h3>
                    <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Complete the following training materials before taking the certification quiz:
                    </p>
                    
                    <div className="space-y-3">
                      {trainingData[selectedModule.id].resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                            theme === 'light' 
                              ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' 
                              : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {resource.type === 'video' ? (
                              <Play className="h-5 w-5 text-blue-500" />
                            ) : (
                              <FileText className="h-5 w-5 text-green-500" />
                            )}
                            <div>
                              <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {resource.title}
                              </p>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                {resource.duration}
                              </p>
                            </div>
                          </div>
                          <ExternalLink className="h-5 w-5 text-gray-400" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleTakeQuiz}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Take Certification Quiz
                  </button>
                </>
              ) : (
                <>
                  {!quizSubmitted ? (
                    <>
                      <div className="mb-6">
                        <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          Certification Quiz
                        </h3>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                          Answer all questions correctly (70% or higher) to earn your certificate.
                        </p>
                      </div>

                      <div className="space-y-6 mb-6">
                        {trainingData[selectedModule.id].quiz.map((question, qIndex) => (
                          <div key={question.id} className={`p-4 rounded-lg border ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-700 border-gray-600'}`}>
                            <p className={`font-medium mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                              {qIndex + 1}. {question.question}
                            </p>
                            <div className="space-y-2">
                              {question.options.map((option, oIndex) => (
                                <label
                                  key={oIndex}
                                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                                    quizAnswers[question.id] === oIndex
                                      ? theme === 'light'
                                        ? 'bg-blue-100 border-2 border-blue-500'
                                        : 'bg-blue-900 border-2 border-blue-500'
                                      : theme === 'light'
                                      ? 'bg-white border border-gray-300 hover:bg-gray-100'
                                      : 'bg-gray-800 border border-gray-600 hover:bg-gray-700'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    checked={quizAnswers[question.id] === oIndex}
                                    onChange={() => handleQuizAnswer(question.id, oIndex)}
                                    className="mr-3"
                                  />
                                  <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                                    {option}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={() => setShowQuiz(false)}
                          className={`flex-1 px-6 py-3 border rounded-lg font-medium transition-colors ${
                            theme === 'light'
                              ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          Back to Resources
                        </button>
                        <button
                          onClick={handleSubmitQuiz}
                          disabled={Object.keys(quizAnswers).length < trainingData[selectedModule.id].quiz.length}
                          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Quiz
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      {quizScore >= 70 ? (
                        <>
                          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                          <h3 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Congratulations! 🎉
                          </h3>
                          <p className={`text-lg mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            You scored {quizScore.toFixed(0)}% and earned your certificate!
                          </p>
                          <div className="flex space-x-4 justify-center">
                            <button
                              onClick={() => alert('Certificate downloaded!')}
                              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                              Download Certificate
                            </button>
                            <button
                              onClick={handleCloseModal}
                              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                              Close
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <X className="h-16 w-16 text-red-500 mx-auto mb-4" />
                          <h3 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Not Quite There
                          </h3>
                          <p className={`text-lg mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            You scored {quizScore.toFixed(0)}%. You need 70% or higher to pass.
                          </p>
                          <div className="flex space-x-4 justify-center">
                            <button
                              onClick={() => setShowQuiz(false)}
                              className={`px-6 py-3 border rounded-lg font-medium transition-colors ${
                                theme === 'light'
                                  ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                  : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                              }`}
                            >
                              Review Materials
                            </button>
                            <button
                              onClick={handleTakeQuiz}
                              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                              Retake Quiz
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingSection;