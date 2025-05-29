import { useState, useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import api from "../lib/axios";
import NavbarHomePage from "../components/HomePageComponents/NavbarHomePage";
import HomePageFooter from "../components/HomePageComponents/HomePageFooter";
import ConversationsList from "../components/MessagesPageComponents/ConversationsList";
import ChatWindow from "../components/MessagesPageComponents/ChatWindow";
import { socketService } from "../services/socket";
import { useNavigate } from "react-router-dom";

const MessagesPage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    socketService.connect(user._id);
    return () => {
      socketService.disconnect();
    };
  }, [user, navigate]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      
      try {
        const response = await api.get("/api/messages/conversations");
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);

  useEffect(() => {
    if (!user || !selectedUser) return;

    const roomId = [user._id, selectedUser._id].sort().join("_");
    socketService.joinRoom(roomId);

    const fetchMessages = async () => {
      try {
        const response = await api.get(`/api/messages/messages/${selectedUser._id}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    const unsubscribeMessages = socketService.onMessage((data) => {
      if (
        (data.sender._id === selectedUser._id && data.receiver._id === user._id) ||
        (data.sender._id === user._id && data.receiver._id === selectedUser._id)
      ) {
        setMessages(prev => [...prev, data]);
        
        // Update conversations list
        const relatedConversationIndex = conversations.findIndex(
          (conv) =>
            (conv.user._id === data.sender._id && data.receiver._id === user._id) ||
            (conv.user._id === data.receiver._id && data.sender._id === user._id)
        );

        if (relatedConversationIndex > -1) {
          const existingConversation = conversations[relatedConversationIndex];
          const updatedConversation = {
            ...existingConversation,
            lastMessage: data,
            unreadCount: data.receiver._id === user._id && selectedUser?._id !== data.sender._id
              ? existingConversation.unreadCount + 1
              : existingConversation.unreadCount,
          };

          setConversations([
            updatedConversation,
            ...conversations.slice(0, relatedConversationIndex),
            ...conversations.slice(relatedConversationIndex + 1),
          ]);
        } else {
          // If it's a new conversation, refetch the conversations list
          fetchConversations();
        }
      }
    });

    return () => {
      socketService.leaveRoom(roomId);
      unsubscribeMessages();
    };
  }, [selectedUser, user, conversations]);

  const handleSendMessage = async (content) => {
    if (!user || !selectedUser || !content.trim()) return;

    const messageData = {
      content,
      receiver: selectedUser._id,
    };

    try {
      const response = await api.post("/api/messages/send", messageData);
      socketService.sendMessage(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <NavbarHomePage />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r border-gray-200">
              <ConversationsList
                conversations={conversations}
                selectedUser={selectedUser}
                setConversations={setConversations}
                setSelectedUser={setSelectedUser}
              />
            </div>
            
            {/* Chat Window */}
            <div className="w-full md:w-2/3">
              {selectedUser ? (
                <ChatWindow
                  selectedUser={selectedUser}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  currentUser={user}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <HomePageFooter />
    </div>
  );
};

export default MessagesPage; 