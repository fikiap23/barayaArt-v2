import Chat from "../models/chat.model.js";

const chatController = {
  // Get all chats
  getChats: async (req, res) => {
    try {
      const chats = await Chat.find();
      res.json({ message: "Get All Chats Success", chats });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed Get All Chats", detail: error.message });
    }
  },

  // Get chat by ID
  getChatById: async (req, res) => {
    try {
      const chat = await Chat.findById(req.params.id);
      res.json({ message: "Get Chat Success", chat });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed Get Chat", detail: error.message });
    }
  },

  // Create a new chat
  createChat: async (req, res) => {
    const { user1Id, user2Id } = req.body;
    try {
      const existingChat = await Chat.findOne({
        $or: [
          { user1: user1Id, user2: user2Id },
          { user1: user2Id, user2: user1Id },
        ],
      });

      if (existingChat) {
        return res.status(400).json({ message: "Chat already exists" });
      }

      const newChat = new Chat({
        user1: user1Id,
        user2: user2Id,
        messages: [],
      });

      await newChat.save();
      res.status(201).json({
        message: "Chat created successfully",
        chat: newChat,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed Create Chat", detail: error.message });
    }
  },

  // Add message to chat
  addMessageToChat: async (req, res) => {
    const { chatId, userId, text } = req.body;
    try {
      const chat = await Chat.findById(chatId);

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      if (
        chat.user1.toString() !== userId &&
        chat.user2.toString() !== userId
      ) {
        return res
          .status(403)
          .json({ message: "User is not part of the chat" });
      }

      const newMessage = {
        userId,
        text,
        timestamp: Date.now(),
      };

      chat.messages.push(newMessage);
      await chat.save();

      res.status(200).json({
        message: "Message added successfully",
        chat,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed Add Message", detail: error.message });
    }
  },

  // Delete
  deleteChat: async (req, res) => {
    try {
      const deletedChat = await Chat.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Delete Chat Success", deletedChat });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed Delete Chat", detail: error.message });
    }
  },
};

export default chatController;
