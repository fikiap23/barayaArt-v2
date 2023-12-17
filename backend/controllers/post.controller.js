import Post from '../models/post.model.js'
import User from '../models/user.model.js'
import { uploadImage, deleteImage } from '../utils/uploadImage.js'
import mongoose from 'mongoose'

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
      const { userIdOrUsername } = req.params

      // Validate userIdOrUsername
      if (!userIdOrUsername) {
        return res
          .status(400)
          .json({ error: 'userIdOrUsername parameter is required' })
      }

      let user
      if (mongoose.Types.ObjectId.isValid(userIdOrUsername)) {
        // If it's a valid ObjectId, search by _id
        user = await User.findById(userIdOrUsername)
      } else {
        // Assume it's a username and search by username
        user = await User.findOne({ username: userIdOrUsername })
      }

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      // Use aggregate to get posts by user and unwind the postedBy field
      const posts = await Post.aggregate([
        { $match: { postedBy: user._id } },
        { $sort: { createdAt: -1 } },
      ])

      // Format the userData
      const userData = {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        profilePic: user.profilePic,
        followers: user.followers,
        following: user.following,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }

      res.status(200).json({
        message: 'Get Posts by User Success',
        userData,
        postData: posts,
      })
    } catch (error) {
      console.error('Error in getPostByUserIdOrUsername:', error)
      res.status(500).json({ error: 'Internal Server Error' })
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
      const { description, postedBy, category } = req.body
      let { image } = req.body
      if (!postedBy || !image || !category) {
        return res.status(400).json({
          error: 'Postedby and image and category fields are required',
        })
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
        category,
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

  getPostsByCategory: async (req, res) => {
    try {
      const { category } = req.params

      // Validate category
      if (!category) {
        return res.status(400).json({ error: 'Category parameter is required' })
      }

      // Use aggregate to get posts by category (case-insensitive)
      const posts = await Post.aggregate([
        { $match: { category: { $regex: new RegExp(category, 'i') } } },
        { $sort: { createdAt: -1 } },
      ])

      res.status(200).json({ message: 'Get Posts by Category Success', posts })
    } catch (error) {
      console.error('Error in getPostsByCategory:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}

export default postController
