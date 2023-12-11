import mongoose, { mongo } from "mongoose";

const postSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    image_public_id: {
      type: String,
      required: true,
    },
    title_name: {
      type: String,
      require: true,
    },
    likes: {
      type: Array,
      default: "",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
