import Comment from "../models/comment.model.js";

const commentController = {
  getComments: async (req, res) => {
    try {
      const comments = await Comment.find();
      res.json({ message: "Get All Comments Success", comments });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed Get All Comments", detail: error.message });
    }
  },
  getCommentById: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      res.json({ message: "Get Comment Success", comment });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed Get Comment", detail: error.message });
    }
  },
  createComment: async (req, res) => {
    const comment = new Comment(req.body);
    try {
      const savedComment = await comment.save();
      res.status(201).json({ message: "Create Comment Success", savedComment });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed Create Comment", detail: error.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Update Comment Success", updatedComment });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed Update Comment", detail: error.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "Delete Comment Success", deletedComment });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed Delete Comment", detail: error.message });
    }
  },
};

export default commentController;
