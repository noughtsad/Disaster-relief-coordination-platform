import { useState } from 'react';
import { Send, User, MessageSquare, CheckCircle, Mail, Star } from 'lucide-react';
import axios from 'axios';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !text.trim() || rating === 0) {
      alert('Please fill in all required fields (Name, Feedback, Rating).');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/feedback", {
        name: name.trim(),
        email: email.trim(),
        text: text.trim(),
        rating,
      });

      if (response.data.message === "Feedback saved successfully") {
        setIsSubmitted(true);
      } else {
        alert('Something went wrong. Try again.');
      }
    } catch {
      alert('Error submitting feedback.');
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setText('');
    setRating(0);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
            <p className="text-gray-600">Your feedback has been submitted successfully.</p>
          </div>
          <button
            onClick={handleReset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 max-w-md w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">We Value Your Feedback</h1>
          <p className="text-sm sm:text-base text-gray-600">Help us improve by sharing your thoughts</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter your name"
              maxLength={50}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter your email"
              maxLength={100}
            />
          </div>

          {/* Feedback */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              id="feedback"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
              placeholder="Share your thoughts, suggestions, or report any issues..."
              maxLength={500}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {text.length}/500 characters
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Star className="w-4 h-4 inline mr-1" />
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 justify-center sm:justify-start">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center text-sm sm:text-base ${
                    rating >= star
                      ? "bg-yellow-400 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {star}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Your feedback helps us create a better experience for everyone
        </div>
      </div>
    </div>
  );
}
