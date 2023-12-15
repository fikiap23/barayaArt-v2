import Post from '../models/post.model.js'
import User from '../models/user.model.js'
import { uploadImage, deleteImage } from '../utils/uploadImage.js'

const postController = {
  getPost: async (req, res) => {
    try {
      const posts = await Post.find().populate('postedBy', '-password') // Exclude the password field
      res.json({ message: 'Get All Posts Success', posts })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed Get All Posts', detail: error.message })
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      }
      res.json({ message: 'Get Post Success', post })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Failed Get Post', detail: error.message })
    }
  },

  getPostByUserIdOrUsername: async (req, res) => {
    try {
      // Ekstrak userId atau username dari parameter permintaan
      const { userIdOrUsername } = req.params

      // Temukan pengguna berdasarkan apakah userIdOrUsername adalah ID atau username
      const user = await User.findOne({
        $or: [{ _id: userIdOrUsername }, { username: userIdOrUsername }],
      })

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      // Dapatkan postingan untuk pengguna yang ditemukan
      const posts = await Post.find({ postedBy: user._id }).sort({
        createdAt: -1,
      })

      res.status(200).json({ message: 'Get Posts by User Success', posts })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getFeedPosts: async (req, res) => {
    try {
      const userId = req.user._id
      const user = await User.findById(userId)

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const following = user.following

      // Menggunakan $in untuk mencakup postingan dari orang yang diikuti dan postingan sendiri
      const feedPosts = await Post.find({
        $or: [{ postedBy: { $in: following } }, { postedBy: userId }],
      }).sort({ createdAt: -1 })

      res.status(200).json(feedPosts)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  createPost: async (req, res) => {
    try {
      const { description, postedBy } = req.body
      let { image } = req.body
      if (!postedBy || !image) {
        return res
          .status(400)
          .json({ error: 'Postedby and image fields are required' })
      }
      const user = await User.findById(postedBy)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      if (user._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({ error: 'Unauthorized to create post' })
      }

      const imageUrl = await uploadImage(`${image}`)
      // const imageFile = await uploadImage(req.file.path)  >> ini reql.file.path
      const post = new Post({
        image: imageUrl.url,
        image_public_id: imageUrl.public_id,
        description,
        postedBy,
      })
      const savedPost = await post.save()
      res.status(201).json({
        message: 'Create Post Success',
        savedPost,
        // cloudinary: {
        //   asset_id: imageUrl.asset_id,
        //   public_id: imageUrl.public_id,
        //   url: imageUrl.url,
        // },
      })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Failed Create Post', detail: error.message })
    }
  },
  updatePost: async (req, res) => {
    try {
      let { description, image } = req.body

      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      }

      if (post.postedBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ error: 'Unauthorized to update post' })
      }

      if (image) {
        const getImagePublicId = post.image_public_id
        await deleteImage(getImagePublicId)
        const imageUrl = await uploadImage(`${image}`)
        image = imageUrl.url
        // console.log(imageUrl)
        post.image = image
        post.image_public_id = imageUrl.public_id
      }

      post.description = description

      await post.save()

      res.status(200).json({ message: 'Update Post Success', post })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Failed Update Post', detail: error.message })
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      const getImagePublicId = post.image_public_id
      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      }

      if (post.postedBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ error: 'Unauthorized to delete post' })
      }
      await deleteImage(getImagePublicId)
      const deletedPost = await Post.findByIdAndDelete(req.params.id)

      res.status(200).json({ message: 'Delete Post Success', deletedPost })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Failed Delete Post', detail: error.message })
    }
  },
}

export default postController
