import { useState, useEffect, useRef } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { Paperclip, Send, Phone, Video, MoreVertical } from "lucide-react";

export default function ChatWindow({ selectedUser, messages, onSendMessage, currentUser }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const formatTime = (date) => {
    if (!date) return "";
    const messageDate = new Date(date);
    const now = new Date();
    const diff = now - messageDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return messageDate.toLocaleDateString([], { weekday: "short" });
    } else {
      return messageDate.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  if (!selectedUser) {
    return (
      <div className="h-full bg-white rounded-lg shadow-md flex items-center justify-center">
        <div className="text-center text-gray-500">
          <i className="fas fa-comments text-4xl mb-2"></i>
          <p>Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg shadow-md flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="flex-shrink-0">
          {selectedUser.avatar ? (
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
              {selectedUser.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{selectedUser.name}</p>
          <p className="text-xs text-gray-500">Online</p>
        </div>
        <div className="ml-auto flex space-x-2">
          <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <Phone size={20} />
          </button>
          <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <Video size={20} />
          </button>
          <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: "calc(100vh - 200px)" }}>
        {messages.map((message, index) => {
          const isOwnMessage = message.sender._id === currentUser._id;
          const showDate = index === 0 ||
            new Date(message.createdAt).toDateString() !==
            new Date(messages[index - 1].createdAt).toDateString();

          return (
            <div key={message._id}>
              {showDate && (
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-gray-50 text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
              <div className={`flex ${isOwnMessage ? "justify-end" : ""} mb-4`}>
                {!isOwnMessage && (
                  <div className="flex-shrink-0 mr-3">
                    {selectedUser.avatar ? (
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium text-sm">
                        {selectedUser.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}
                  </div>
                )}
                <div className="max-w-xs lg:max-w-md">
                  <div className={`p-3 rounded-lg shadow-sm ${isOwnMessage ? "gradient-bg text-white" : "bg-white text-gray-800"}`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? "text-right" : ""}`}>
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="p-2 rounded-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
            onClick={(e) => {
              e.preventDefault();
              if (newMessage.trim()) {
                onSendMessage(newMessage);
                setNewMessage("");
              }
            }}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
} 