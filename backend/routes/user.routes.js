import express from 'express'
import userController from '../controllers/user.controller.js'
import protectRoute from '../middleware/authorization.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing users.
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Get All Users Success", users: [] }
 */
router.get('/', userController.getUser)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Get User Success", user: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Get User", detail: "Error message" }
 */
router.get('/:query', userController.getUserProfile)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { email: "user@example.com", password: "password" }
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Login Success", user: {} }
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example: { message: "Invalid Password" }
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example: { message: "User Not Found" }
 */
router.post('/login', userController.loginUser)

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { email: "user@example.com", password: "password", name: "John Doe" }
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Register Success", user: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Register User", detail: "Error message" }
 */
router.post('/register', userController.registerUser)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { name: "Updated Name" }
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Update Success", user: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Update User", detail: "Error message" }
 */
router.put('/:id', userController.updateUser)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: "Delete Success", user: {} }
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: { message: "Failed Delete User", detail: "Error message" }
 */
// router.delete('/:id', userController.deleteUser)

router.post('/logout', userController.logoutUser)

router.post('/follow/:id', userController.followUnFollowUser) // Toggle state(follow/unfollow)

export default router
