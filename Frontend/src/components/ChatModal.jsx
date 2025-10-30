import React, { useState, useEffect, useRef, useContext } from 'react';
import { X, Send, User, Paperclip, Smile } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const ChatModal = ({ isOpen, onClose, request, currentUser }) => {
  const { theme } = useContext(ThemeContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample initial messages (in real app, these would come from backend/socket)
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: 1,
          senderId: request?.survivorId || 'survivor-1',
          senderName: 'John Doe',
          senderRole: 'Survivor',
          text: 'Hello, thank you for accepting my request.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 2,
          senderId: currentUser?.id || 'ngo-1',
          senderName: currentUser?.name || 'Relief Organization',
          senderRole: currentUser?.role || 'NGO',
          text: 'We are here to help. Can you provide more details about your current situation?',
          timestamp: new Date(Date.now() - 3000000).toISOString(),
        },
      ]);
      
      // Focus input when modal opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, request, currentUser]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      senderId: currentUser?.id || 'current-user',
      senderName: currentUser?.name || 'You',
      senderRole: currentUser?.role || 'User',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate typing indicator (in real app, this would come from socket)
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);

    // TODO: Send message via socket.io
    // socket.emit('sendMessage', { requestId: request.id, message });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isCurrentUser = (senderId) => {
    return senderId === (currentUser?.id || 'current-user');
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
              Chat - {request?.type || 'Request'} Support
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Request #{request?.id} • {request?.urgency} Priority
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
              key={message.id}
              className={`flex ${isCurrentUser(message.senderId) ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[70%] ${
                isCurrentUser(message.senderId) ? 'flex-row-reverse' : 'flex-row'
              }`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                  isCurrentUser(message.senderId)
                    ? 'bg-indigo-600'
                    : message.senderRole === 'Survivor'
                    ? 'bg-green-600'
                    : message.senderRole === 'NGO'
                    ? 'bg-blue-600'
                    : message.senderRole === 'Volunteer'
                    ? 'bg-purple-600'
                    : 'bg-orange-600'
                }`}>
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>

                {/* Message Content */}
                <div className={`flex flex-col ${
                  isCurrentUser(message.senderId) ? 'items-end' : 'items-start'
                }`}>
                  <div className={`flex items-baseline gap-2 mb-1 ${
                    isCurrentUser(message.senderId) ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <span className={`text-xs sm:text-sm font-semibold ${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      {message.senderName}
                    </span>
                    <span className={`text-xs ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {message.senderRole}
                    </span>
                  </div>
                  
                  <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
                    isCurrentUser(message.senderId)
                      ? 'bg-indigo-600 text-white rounded-tr-sm'
                      : theme === 'light'
                      ? 'bg-white text-gray-900 rounded-tl-sm shadow-sm'
                      : 'bg-gray-700 text-gray-100 rounded-tl-sm'
                  }`}>
                    <p className="text-sm sm:text-base break-words whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                  
                  <span className={`text-xs mt-1 ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[70%]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className={`px-4 py-3 rounded-2xl rounded-tl-sm ${
                  theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-700'
                }`}>
                  <div className="flex gap-1">
                    <span className={`w-2 h-2 rounded-full animate-bounce ${
                      theme === 'light' ? 'bg-gray-400' : 'bg-gray-400'
                    }`} style={{ animationDelay: '0ms' }}></span>
                    <span className={`w-2 h-2 rounded-full animate-bounce ${
                      theme === 'light' ? 'bg-gray-400' : 'bg-gray-400'
                    }`} style={{ animationDelay: '150ms' }}></span>
                    <span className={`w-2 h-2 rounded-full animate-bounce ${
                      theme === 'light' ? 'bg-gray-400' : 'bg-gray-400'
                    }`} style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 sm:p-6 border-t ${
          theme === 'light' ? 'border-gray-200 bg-white' : 'border-gray-700 bg-gray-900'
        }`}>
          <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
            {/* Attachment Button (Optional) */}
            <button
              type="button"
              className={`p-2 sm:p-2.5 rounded-lg transition hidden sm:block ${
                theme === 'light'
                  ? 'hover:bg-gray-100 text-gray-600'
                  : 'hover:bg-gray-700 text-gray-400'
              }`}
            >
              <Paperclip className="w-5 h-5" />
            </button>

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

            {/* Emoji Button (Optional) */}
            <button
              type="button"
              className={`p-2 sm:p-2.5 rounded-lg transition hidden sm:block ${
                theme === 'light'
                  ? 'hover:bg-gray-100 text-gray-600'
                  : 'hover:bg-gray-700 text-gray-400'
              }`}
            >
              <Smile className="w-5 h-5" />
            </button>

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

          {/* Info Text */}
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
