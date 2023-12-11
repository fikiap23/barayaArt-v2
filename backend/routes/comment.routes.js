import express from "express";
import commentController from "../controllers/comment.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments.
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Get All Comments Success", comments: [] }
 */
router.get("/", commentController.getComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Get Comment Success", comment: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Get Comment", detail: "Error message" }
 */
router.get("/:id", commentController.getCommentById);

/**
 * @swagger
 * /comments/create:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { comment: "This is a new comment", postId: "postId" }
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Create Comment Success", savedComment: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Create Comment", detail: "Error message" }
 */
router.post("/create", commentController.createComment);

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { comment: "Updated comment" }
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Update Comment Success", updatedComment: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Update Comment", detail: "Error message" }
 */
router.patch("/:id", commentController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Delete Comment Success", deletedComment: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Delete Comment", detail: "Error message" }
 */
router.delete("/:id", commentController.deleteComment);

export default router;
