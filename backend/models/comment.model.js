import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    textComment: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)
export default Comment
