import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js'

const userController = {
  getUser: async (req, res) => {
    try {
      const users = await User.find()
      res.json({ message: 'Get All Users Success', users })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed Get ALl Users', detail: error.message })
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.json({ message: 'Get User Success ', user })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Failed Get User', detail: error.message })
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
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      res.status(200).json({ message: 'Update Success', updatedUser })
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
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'Delete Success', deletedUser })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Failed Delete User', detail: error.message })
    }
  },
}

export default userController
