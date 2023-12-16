import express from 'express'
import commentController from '../controllers/comment.controller.js'
import protectRoute from '../middleware/authorization.js'

const router = express.Router()

// Create comment to post
router.post('/:postId', protectRoute, commentController.commentToPost)

// Get comments by post
router.get('/:postId', commentController.getCommentsByPost)

// Update a comment
router.put('/:commentId', protectRoute, commentController.updateComment)

// Delete a comment
router.delete('/:commentId', protectRoute, commentController.deleteComment)

export default router
