import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js'
import { v2 as cloudinary } from 'cloudinary'
import mongoose from 'mongoose'

const userController = {
  getUser: async (req, res) => {
    try {
      const users = await User.find().select('-password').select('-updatedAt')
      res.json({ message: 'Get All Users Success', users })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed Get ALl Users', detail: error.message })
    }
  },
  getUserProfile: async (req, res) => {
    // We will fetch user profile either with username or userId
    // query is either username or userId
    const { query } = req.params

    try {
      let user

      // query is userId
      if (mongoose.Types.ObjectId.isValid(query)) {
        user = await User.findOne({ _id: query })
          .select('-password')
          .select('-updatedAt')
      } else {
        // query is username
        user = await User.findOne({ username: query })
          .select('-password')
          .select('-updatedAt')
      }

      if (!user) return res.status(404).json({ error: 'User not found' })

      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: err.message })
      console.log('Error in getUserProfile: ', err.message)
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body
    try {
      const validUser = await User.findOne({ email })
      const hashPass = await bcrypt.compare(password, validUser.password)
      if (!validUser) {
        return res.status(404).json({ message: 'User Not Found' })
      }
      if (!hashPass) {
        return res.status(401).json({ message: 'Invalid Password' })
      }
      generateTokenAndSetCookie(validUser._id, res)
      res.status(200).json({ message: 'Login Success', validUser })
    } catch (error) {
      res.status(500).json({ message: 'Failed Login', detail: error.message })
    }
  },
  registerUser: async (req, res) => {
    try {
      const { email, username, password, name } = req.body
      const salt = await bcrypt.genSalt()
      const hashPass = await bcrypt.hash(password, salt)
      // cek apakah user ada di db
      const user = await User.findOne({ $or: [{ email }, { username }] })
      if (user) {
        return res.status(400).json({ error: 'User already exists' })
      }
      const newUser = new User({
        email,
        username,
        password: hashPass,
        name,
      })
      const savedUser = await newUser.save()
      if (!savedUser) {
        return res.status(400).json({ error: 'Failed Register User' })
      }
      // generate token
      generateTokenAndSetCookie(newUser._id, res)
      res.status(201).json({ message: 'Register Success', savedUser })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Failed Register User', detail: error.message })
    }
  },
  updateUser: async (req, res) => {
    const { name, email, username, password } = req.body
    let { profilePic } = req.body

    const userId = req.user._id
    try {
      let user = await User.findById(userId)
      if (!user) return res.status(400).json({ error: 'User not found' })

      if (req.params.id !== userId.toString())
        return res
          .status(400)
          .json({ error: "You cannot update other user's profile" })

      if (password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword
      }

      if (profilePic) {
        if (user.profilePic) {
          await cloudinary.uploader.destroy(
            user.profilePic.split('/').pop().split('.')[0]
          )
        }

        const uploadedResponse = await cloudinary.uploader.upload(profilePic)
        profilePic = uploadedResponse.secure_url
      }

      user.name = name || user.name
      user.email = email || user.email
      user.username = username || user.username
      user.profilePic = profilePic || user.profilePic

      user = await user.save()
      res.status(200).json({ message: 'Update Success', user })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Failed Update User', detail: error.message })
    }
  },

  logoutUser: async (req, res) => {
    try {
      res.cookie('jwt', '', { maxAge: 1 })
      res.status(200).json({ message: 'User logged out successfully' })
    } catch (err) {
      res.status(500).json({ error: err.message })
      console.log('Error in logout: ', err.message)
    }
  },

  followUnFollowUser: async (req, res) => {
    try {
      const { id } = req.params
      const userToModify = await User.findById(id)
      const currentUser = await User.findById(req.user._id)

      if (id === req.user._id.toString())
        return res
          .status(400)
          .json({ error: 'You cannot follow/unfollow yourself' })

      if (!userToModify || !currentUser)
        return res.status(400).json({ error: 'User not found' })

      const isFollowing = currentUser.following.includes(id)

      if (isFollowing) {
        // Unfollow user
        await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
        await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
        res.status(200).json({ message: 'User unfollowed successfully' })
      } else {
        // Follow user
        await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
        await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
        res.status(200).json({ message: 'User followed successfully' })
      }
    } catch (err) {
      res.status(500).json({ error: err.message })
      console.log('Error in followUnFollowUser: ', err.message)
    }
  },

  // deleteUser: async (req, res) => {
  //   try {
  //     const deletedUser = await User.findByIdAndDelete(req.params.id)
  //     res.status(200).json({ message: 'Delete Success', deletedUser })
  //   } catch (error) {
  //     res
  //       .status(400)
  //       .json({ message: 'Failed Delete User', detail: error.message })
  //   }
  // },
}

export default userController
