import Comment from '../models/comment.model.js'
import Post from '../models/post.model.js'

const commentController = {
  commentToPost: async (req, res) => {
    try {
      const { textComment } = req.body
      const postId = req.params.postId
      const commentedBy = req.user._id

      console.log(postId)

      if (!textComment) {
        return res.status(400).json({ error: 'Text field is required' })
      }

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      }

      const newComment = {
        postId,
        textComment,
        commentedBy,
      }

      const savedComment = await Comment.create(newComment)

      res.status(200).json({ message: 'Comment on Post Success', savedComment })
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Failed Create Comment', detail: err.message })
    }
  },

  getCommentsByPost: async (req, res) => {
    try {
      const postId = req.params.postId

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      }

      const comments = await Comment.find({ postId })

      res.status(200).json({ comments })
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Failed to retrieve comments', detail: err.message })
    }
  },

  updateComment: async (req, res) => {
    try {
      const { textComment } = req.body
      const commentId = req.params.commentId
      const commentedBy = req.user._id

      if (!textComment) {
        return res.status(400).json({ error: 'Text field is required' })
      }

      const comment = await Comment.findById(commentId)
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' })
      }

      // Check if the user is authorized to update the comment
      if (comment.commentedBy.toString() !== commentedBy.toString()) {
        return res
          .status(403)
          .json({ error: 'Unauthorized to update this comment' })
      }

      comment.textComment = textComment
      const updatedComment = await comment.save()

      res
        .status(200)
        .json({ message: 'Comment updated successfully', updatedComment })
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Failed to update comment', detail: err.message })
    }
  },

  deleteComment: async (req, res) => {
    try {
      const commentId = req.params.commentId

      const comment = await Comment.findById(commentId)
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' })
      }

      // Check if the user is authorized to delete the comment
      if (comment.commentedBy.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ error: 'Unauthorized to delete this comment' })
      }

      await Comment.findByIdAndDelete(commentId)

      res.status(200).json({ message: 'Comment deleted successfully' })
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Failed to delete comment', detail: err.message })
    }
  },
}

export default commentController
