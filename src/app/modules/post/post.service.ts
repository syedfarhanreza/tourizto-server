/* eslint-disable @typescript-eslint/ban-ts-comment */
import mongoose, { ObjectId } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { IAnyObject } from "../../interface/error";
import { TUser } from "../user/user.interface";
import { IPost } from "./post.interface";
import Post from "./post.model";

const createPost = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const votePost = async (
  postId: string,
  userId: string,
  vote: "upvote" | "downvote"
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const userObjectId = new mongoose.Types.ObjectId(
    userId
  ) as unknown as ObjectId;

  if (vote === "upvote") {
    // @ts-ignore
    const isAlreadyUpVoted = post.upVotes.includes(userObjectId);
    if (isAlreadyUpVoted) {
      post.upVotes.pull(userObjectId);
    } else {
      post.upVotes.addToSet(userObjectId);
      post.downVotes.pull(userObjectId);
    }
  } else {
    // @ts-ignore
    const isAlreadyDownVoted = post.downVotes.includes(userObjectId);
    if (isAlreadyDownVoted) {
      post.downVotes.pull(userObjectId);
    } else {
      post.downVotes.addToSet(userObjectId);
      post.upVotes.pull(userObjectId);
    }
  }

  // Update the upvoteCount and downvoteCount after updating the arrays
  post.upVoteCount = post.upVotes.length;
  post.downVoteCount = post.downVotes.length;

  // Save the post after updating counts
  await post.save();

  const result = await post.save();
  return result;
};

const getAllPosts = async (query: IAnyObject, user: TUser | null) => {
  let model = Post.find().populate("user").populate("categories");
  if (query.categories) {
    const ids = query.categories
      .split(",")
      .map((id: string) => new mongoose.Types.ObjectId(id));
    model = model.find({ categories: { $in: ids } });
  }
  delete query.categories;

  if (query.premium && user && user.isPremium) {
    model.find({ premium: true });
  } else {
    model = model.find({ premium: false });
  }
  delete query.premium;

  const queryModel = new QueryBuilder(model, query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(["title", "content"]);

  const totalDoc = await queryModel.count();
  const result = await queryModel.modelQuery;
  return { result, totalDoc: totalDoc.totalCount };
};

const getPostById = async (id: string) => {
  const result = await Post.findById(id)
    .populate("user")
    .populate("categories");
  return result;
};

const updatePost = async (id: string, payload: IPost, user: string) => {
  const isExists = await Post.findById(id);
  if (!isExists) {
    throw new AppError(404, "Post not found");
  }

  if (isExists.user.toString() !== user.toString()) {
    throw new AppError(403, "Unauthorized access");
  }

  const updatePayload: Partial<IPost> = {};

  ["content", "images", "categories"].forEach((key) => {
    // @ts-ignore
    if (payload[key]) {
      // @ts-ignore
      updatePayload[key] = payload[key];
    }
  });

  const result = await Post.findByIdAndUpdate(id, updatePayload, { new: true });
  return result;
};

const deletePost = async (id: string, user: TUser) => {
  const isExists = await Post.findById(id);
  if (!isExists) {
    throw new AppError(404, "Post not found");
  }

  if (
    isExists.user.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    ``;
    throw new AppError(403, "Unauthorized access");
  }

  const result = await Post.findByIdAndDelete(isExists._id);
  return result;
};
const postService = {
  createPost,
  deletePost,
  getAllPosts,
  votePost,
  getPostById,
  updatePost,
};
export default postService;