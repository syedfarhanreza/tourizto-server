"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    },
    categories: {
        type: [mongoose_1.Types.ObjectId],
        required: true,
        ref: "Category",
    },
    upvotes: {
        type: [mongoose_1.Types.ObjectId],
        ref: "User",
    },
    downvotes: {
        type: [mongoose_1.Types.ObjectId],
        ref: "User",
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    upvoteCount: {
        type: Number,
        default: 0,
    },
    downvoteCount: {
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
}, { timestamps: true });
const Post = mongoose_1.default.model("Post", PostSchema);
exports.default = Post;
