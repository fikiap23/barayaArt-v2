import Post from "../models/post.model.js";
import { uploadImage, deleteImage } from "../utils/uploadImage.js";

const postController = {
  getPost: async (req, res) => {
    try {
      const posts = await Post.find();
      res.json({ message: "Get All Posts Success", posts });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed Get All Posts", detail: error.message });
    }
  },
  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.json({ message: "Get Post Success", post });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed Get Post", detail: error.message });
    }
  },
  createPost: async (req, res) => {
    //ini file image masih string blm req.file.path
    const { image, title_name, likes } = req.body;

    try {
      const imageUrl = await uploadImage(`${image}`);
      // const imageFile = await uploadImage(req.file.path)  >> ini reql.file.path
      const post = new Post({
        image: imageUrl.url,
        image_public_id: imageUrl.public_id,
        title_name,
        likes,
      });
      const savedPost = await post.save();
      res.status(201).json({
        message: "Create Post Success",
        savedPost,
        // cloudinary: {
        //   asset_id: imageUrl.asset_id,
        //   public_id: imageUrl.public_id,
        //   url: imageUrl.url,
        // },
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed Create Post", detail: error.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ message: "Update Post Success", updatedPost });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed Update Post", detail: error.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      const getImagePublicId = deletedPost.image_public_id;
      await deleteImage(getImagePublicId);
      res.status(200).json({ message: "Delete Post Success", deletedPost });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed Delete Post", detail: error.message });
    }
  },
};

export default postController;
