import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all messages where user is either sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "sender receiver",
        select: "name email avatar",
        model: User
      });

    // Create a map to store unique conversations
    const conversationsMap = new Map();

    messages.forEach((message) => {
      // Skip messages where sender or receiver is not properly populated
      if (!message.sender || !message.receiver) {
        console.warn("Message has undefined sender or receiver:", message._id);
        return;
      }

      const otherUser =
        message.sender._id.toString() === userId.toString()
          ? message.receiver
          : message.sender;

      if (!conversationsMap.has(otherUser._id.toString())) {
        conversationsMap.set(otherUser._id.toString(), {
          user: otherUser,
          lastMessage: message,
          unreadCount: 0,
        });
      }

      // Count unread messages
      if (
        message.receiver._id.toString() === userId.toString() &&
        !message.read
      ) {
        const conversation = conversationsMap.get(otherUser._id.toString());
        if (conversation) {
          conversation.unreadCount += 1;
        }
      }
    });

    const conversations = Array.from(conversationsMap.values());
    res.json(conversations);
  } catch (error) {
    console.error("Error in getConversations:", error);
    res.status(500).json({ message: "Error fetching conversations" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender receiver", "name email avatar");

    // Mark messages as read
    await Message.updateMany(
      {
        sender: userId,
        receiver: currentUserId,
        read: false,
      },
      { read: true }
    );

    res.json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

export const sendMessage = async (req, res, io) => {
  try {
    const { content, receiver } = req.body;
    const sender = req.user._id;

    const message = await Message.create({
      sender,
      receiver,
      content,
    });

    const populatedMessage = await Message.findById(message._id).populate(
      "sender receiver",
      "name email avatar"
    );

    const roomId = [sender.toString(), receiver].sort().join("_");
    io.to(roomId).emit("receive_message", populatedMessage);

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Error sending message" });
  }
}; 