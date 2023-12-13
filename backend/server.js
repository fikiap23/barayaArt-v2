import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
// import verifyToken from "./middleware/authorization.js";
import swaggerUi from 'swagger-ui-express'
import {
  swaggerSpecUser,
  swaggerSpecPost,
  swaggerSpecComment,
  swaggerSpecChat,
} from './swagger/fileSwagger.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const mongoString = process.env.DB_URL
const db = mongoose.connection
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
db.on('error', (error) => {
  console.log(error)
})
db.once('connected', () => {
  console.log('Database Connected')
})

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' })) // for parsing application/json data in the request body
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded data in the request body
app.use(cookieParser())
// app.use(verifyToken);

//Swagger for Docs API
app.use('/api-docs/posts', swaggerUi.serve, swaggerUi.setup(swaggerSpecPost))
app.use(
  '/api-docs/comments',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecComment)
)
app.use('/api-docs/chats', swaggerUi.serve, swaggerUi.setup(swaggerSpecChat))
app.use('/api-docs/auth', swaggerUi.serve, swaggerUi.setup(swaggerSpecUser))

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

app.listen(3000, () => {
  console.log(`Server Running at ${3000}`)
})
