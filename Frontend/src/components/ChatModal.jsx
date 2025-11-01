import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { X, Send, User, Paperclip, Smile } from 'lucide-react';
import { useSelector } from 'react-redux';

const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'); // Connect to your backend URL

const ChatModal = ({ isOpen, onClose, requestId, theme }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const user = useSelector(state => state.app.user); 
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }

    if (!isOpen || !requestId || !user) {
      return;
    }

    socket.emit('joinRoom', { requestId, userId: user._id, userRole: user.userType });

    socket.on('pastMessages', (pastMessages) => {
      setMessages(pastMessages);
      scrollToBottom();
    });

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/chat/${requestId}`,
          { withCredentials: true } // Add withCredentials
        );
        setMessages(response.data);
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
    fetchChatHistory();

    return () => {
      socket.off('pastMessages');
      socket.off('newMessage');
      socket.off('error');
    };
  }, [isOpen, requestId, user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      const messagePayload = {
        requestId,
        sender: user._id,
        onModel: user.userType === 'NGO' ? 'Ngo' : 'User',
        messageContent: newMessage,
      };
      socket.emit('sendMessage', messagePayload);
      setNewMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className={`w-full max-w-4xl h-[85vh] rounded-xl shadow-2xl flex flex-col ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${
          theme === 'light' ? 'border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50' : 'border-gray-700 bg-gradient-to-r from-indigo-900/30 to-purple-900/30'
        }`}>
          <div className="flex-1">
            <h2 className={`text-lg sm:text-xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Chat - Request Support
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Request ID: {requestId}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${
              theme === 'light' 
                ? 'hover:bg-gray-200 text-gray-600' 
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 ${
          theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'
        }`}>
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${message.sender._id === user._id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[70%] ${
                message.sender._id === user._id ? 'flex-row-reverse' : 'flex-row'
              }`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                  message.sender.userType === 'Survivor'
                    ? 'bg-green-600'
                    : message.sender.userType === 'NGO'
                    ? 'bg-blue-600'
                    : message.sender.userType === 'Volunteer'
                    ? 'bg-purple-600'
                    : message.sender.userType === 'Supplier'
                    ? 'bg-orange-600'
                    : 'bg-gray-400'
                }`}>
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>

                {/* Message Content */}
                <div className={`flex flex-col ${
                  message.sender._id === user._id ? 'items-end' : 'items-start'
                }`}>
                  <div className={`flex items-baseline gap-2 mb-1 ${
                    message.sender._id === user._id ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <span className={`text-xs sm:text-sm font-semibold ${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      {message.sender.name || message.sender.username || 'Unknown'}
                    </span>
                    <span className={`text-xs ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {message.sender.userType}
                    </span>
                  </div>
                  
                  <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
                    message.sender._id === user._id
                      ? 'bg-indigo-600 text-white rounded-tr-sm'
                      : theme === 'light'
                      ? 'bg-white text-gray-900 rounded-tl-sm shadow-sm'
                      : 'bg-gray-700 text-gray-100 rounded-tl-sm'
                  }`}>
                    <p className="text-sm sm:text-base break-words whitespace-pre-wrap">
                      {message.messageContent}
                    </p>
                  </div>
                  
                  <span className={`text-xs mt-1 ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 sm:p-6 border-t ${
          theme === 'light' ? 'border-gray-200 bg-white' : 'border-gray-700 bg-gray-900'
        }`}>
          <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
            {/* Message Input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base ${
                  theme === 'light'
                    ? 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    : 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                }`}
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={newMessage.trim() === ''}
              className={`p-2 sm:p-2.5 rounded-lg transition ${
                newMessage.trim() === ''
                  ? theme === 'light'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className={`text-xs mt-3 text-center ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Messages are end-to-end encrypted. Press Enter to send.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
