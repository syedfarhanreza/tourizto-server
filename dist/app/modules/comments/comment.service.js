"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const post_model_1 = __importDefault(require("../post/post.model"));
const comment_model_1 = __importDefault(require("./comment.model"));
const createComment = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.default.create(comment);
    return result;
});
const getCommentsByPostId = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const isPostExists = yield post_model_1.default.findById(postId);
    if (!isPostExists) {
        throw new Error("Post not found");
    }
    const result = yield comment_model_1.default.find({ post: isPostExists._id });
    return result;
});
const updateComment = (id, userId, newComment) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.default.findById(id);
    if (!comment) {
        throw new Error("Comment not found");
    }
    if (comment.user.toString() !== userId) {
        throw new Error("Unauthorized access");
    }
    const isPostExists = yield post_model_1.default.findById(comment.post);
    if (!isPostExists) {
        throw new Error("Post not found");
    }
    const result = yield comment_model_1.default.findByIdAndUpdate(id, {
        comment: newComment,
    }, {
        new: true,
    });
    return result;
});
const deleteComment = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.default.findById(id);
    if (!comment) {
        throw new Error("Comment not found");
    }
    if (comment.user.toString() !== userId) {
        throw new Error("Unauthorized access");
    }
    const isPostExists = yield post_model_1.default.findById(comment.post);
    if (!isPostExists) {
        throw new Error("Post not found");
    }
    const result = yield comment_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.commentService = {
    createComment,
    getCommentsByPostId,
    updateComment,
    deleteComment,
};
