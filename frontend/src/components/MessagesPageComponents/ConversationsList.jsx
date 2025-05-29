import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import api from "../../lib/axios";
import { Plus, Search } from "lucide-react";

export default function ConversationsList({ conversations, setConversations, selectedUser, setSelectedUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const { user } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');

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

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleStartConversation = async (user) => {
    try {
      // Send an initial message to start the conversation
      await api.post("/api/messages/send", {
        content: "Hello! 👋",
        receiver: user._id,
      });
      
      // Refresh conversations list
      const response = await api.get("/api/messages/conversations");
      setConversations(response.data);
      
      // Select the new conversation
      setSelectedUser(user);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const filteredConversations = conversations.filter(conversation => {
    const otherUser = conversation.user;
    const searchTermLower = searchTerm.toLowerCase();
    return otherUser.name.toLowerCase().includes(searchTermLower) ||
           conversation.lastMessage?.content.toLowerCase().includes(searchTermLower);
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header with New Conversation Button */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Conversations</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            fetchUsers();
          }}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Conversation
        </button>
        {/* Search Input */}
        <div className="mt-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18}/>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="divide-y divide-gray-200 flex-1 overflow-y-auto max-h-[calc(100vh-300px)]">
        {filteredConversations.map((conversation) => {
          const otherUser = conversation.user;
          const isSelected = selectedUser?._id === otherUser._id;

          return (
            <div
              key={conversation._id}
              onClick={() => setSelectedUser(otherUser)}
              className={`p-4 flex items-center cursor-pointer transition-colors ${isSelected ? "message-active" : "hover:bg-gray-50"}`}
            >
              <div className="flex-shrink-0 relative">
                 {otherUser.avatar ? (
                    <img
                      src={otherUser.avatar}
                      alt={otherUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                      {otherUser.name.charAt(0)}
                    </div>
                  )}
                 {/* Online Status Indicator */}
                 {/* You'll need logic to determine online status */}
                 {/* <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span> */}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {otherUser.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTime(conversation.lastMessage?.createdAt)}
                  </p>
                </div>
                <div className="flex items-center">
                  {conversation.unreadCount > 0 && (
                    <span className="unread-dot mr-1"></span>
                  )}
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage?.content || "No messages yet"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Conversation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Start New Conversation</h2>
            </div>
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleStartConversation(user)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-indigo-600 font-medium">
                        {user.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 