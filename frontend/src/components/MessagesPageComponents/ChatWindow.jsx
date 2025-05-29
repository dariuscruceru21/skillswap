import { useState, useEffect, useRef } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { Paperclip, Send, MoreVertical, Star } from "lucide-react";
import axios from "axios";

export default function ChatWindow({ selectedUser, messages, onSendMessage, currentUser }) {
  const [newMessage, setNewMessage] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
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

  const handleReview = async (e) => {
    e.preventDefault();
    if (reviewStars < 0 || reviewStars > 5 || !reviewComment.trim()) {
      alert("Please provide a rating from 0-5 and a comment.");
      return;
    }
    setSubmittingReview(true);
    try {
      await axios.post(`/api/auth/users/${selectedUser._id}/reviews`, {
        reviewerId: currentUser._id,
        stars: reviewStars,
        comment: reviewComment,
      });
      setIsReviewModalOpen(false);
      setReviewStars(0);
      setReviewComment("");
      alert("Review submitted!");
    } catch (error) {
      alert("Error submitting review");
    } finally {
      setSubmittingReview(false);
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
          <button
            className="p-2 rounded-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium border border-indigo-100"
            onClick={() => setIsReviewModalOpen(true)}
          >
            Leave a Review
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
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 animate-fadeIn flex items-center justify-center">
          <div className="relative top-20 mx-auto p-6 border w-[500px] shadow-2xl rounded-xl bg-white transform transition-all animate-slideIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Leave a Review for {selectedUser.name}</h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form
              onSubmit={handleReview}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex items-center space-x-1 mb-2">
                  {[0, 1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewStars(star)}
                      className={
                        star <= reviewStars
                          ? "text-yellow-400"
                          : "text-gray-300 hover:text-yellow-400"
                      }
                    >
                      <Star size={28} fill={star <= reviewStars ? "currentColor" : "none"} />
                    </button>
                  ))}
                  <span className="ml-2 text-sm">{reviewStars} / 5</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={4}
                  placeholder="Write your review..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  disabled={submittingReview}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  disabled={submittingReview}
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 