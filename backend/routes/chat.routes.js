import express from "express";
import chatController from "../controllers/chat.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: API for managing chats.
 */

/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Get all chats
 *     tags: [Chats]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Get All Chats Success", chats: [] }
 */
router.get("/", chatController.getChats);

/**
 * @swagger
 * /chats/{id}:
 *   get:
 *     summary: Get a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the chat
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Get Chat Success", chat: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Get Chat", detail: "Error message" }
 */
router.get("/:id", chatController.getChatById);

/**
 * @swagger
 * /chats/create:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { user1Id: "user1Id", user2Id: "user2Id" }
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Chat created successfully", chat: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Create Chat", detail: "Error message" }
 */
router.post("/create", chatController.createChat);

/**
 * @swagger
 * /chats/add-message:
 *   post:
 *     summary: Add message to chat
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { chatId: "chatId", userId: "userId", text: "Hello!" }
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Message added successfully", chat: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Add Message", detail: "Error message" }
 */
router.post("/add-message", chatController.addMessageToChat);

/**
 * @swagger
 * /chats/{id}:
 *   delete:
 *     summary: Delete a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the chat
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Delete Chat Success", deletedChat: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Delete Chat", detail: "Error message" }
 */
router.delete("/:id", chatController.deleteChat);

export default router;
