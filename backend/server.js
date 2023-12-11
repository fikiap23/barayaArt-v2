import express from "express";
import mongoose from "mongoose";
// import verifyToken from "./middleware/authorization.js";
import swaggerUi from "swagger-ui-express";
import {
  swaggerSpecUser,
  swaggerSpecPost,
  swaggerSpecComment,
  swaggerSpecChat,
} from "./swagger/fileSwagger.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import dotenv from "dotenv";

dotenv.config();

const mongoString = process.env.DB_URL;
const db = mongoose.connection;
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
// app.use(verifyToken);

//Swagger for Docs API
app.use("/api-docs/posts", swaggerUi.serve, swaggerUi.setup(swaggerSpecPost));
app.use(
  "/api-docs/comments",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecComment)
);
app.use("/api-docs/chats", swaggerUi.serve, swaggerUi.setup(swaggerSpecChat));
app.use("/api-docs/auth", swaggerUi.serve, swaggerUi.setup(swaggerSpecUser));

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.listen(3000, () => {
  console.log(`Server Running at ${3000}`);
});
