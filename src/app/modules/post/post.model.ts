import mongoose, { Types } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    categories: {
      type: [Types.ObjectId],
      required: true,
      ref: "Category",
    },
    upVotes: {
      type: [Types.ObjectId],
      ref: "User",
    },
    downVotes: {
      type: [Types.ObjectId],
      ref: "User",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    upVoteCount: {
      type: Number,
      default: 0,
    },
    downVoteCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    premium: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;