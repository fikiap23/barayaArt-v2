import express from 'express'
import postController from '../controllers/post.controller.js'
import protectRoute from '../middleware/authorization.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API for managing posts.
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Get All Posts Success", posts: [] }
 */
router.get('/', postController.getPost)

// get feed
router.get('/feed', protectRoute, postController.getFeedPosts)

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Get Post Success", post: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Get Post", detail: "Error message" }
 */
router.get('/:id', postController.getPostById)

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { image: "image-url.jpg", title_name: "Post Title", likes: 0 }
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Create Post Success", savedPost: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Create Post", detail: "Error message" }
 */
router.post('/', protectRoute, postController.createPost)

/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { title_name: "Updated Post Title" }
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Update Post Success", updatedPost: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Update Post", detail: "Error message" }
 */
router.put('/:id', protectRoute, postController.updatePost)

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Delete Post Success", deletedPost: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Delete Post", detail: "Error message" }
 */
router.delete('/:id', protectRoute, postController.deletePost)

export default router
