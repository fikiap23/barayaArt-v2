import mongoose, { mongo } from 'mongoose'

const postSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
    },
    image_public_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    likes: {
      // array of user ids
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)
export default Post
