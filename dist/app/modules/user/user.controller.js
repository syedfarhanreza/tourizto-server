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
exports.generateVerifyAccountPaymentUrl = exports.isCapableForPremium = exports.getAllUser = exports.updateUserInfo = exports.updateUserProfileImage = void 0;
const catchAsyncError_1 = require("../../../utils/catchAsyncError");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const payment_utils_1 = require("../payment/payment.utils");
const post_model_1 = __importDefault(require("../post/post.model"));
const user_model_1 = __importDefault(require("./user.model"));
exports.updateUserProfileImage = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const user = req.user;
    if (!file) {
        return (0, sendResponse_1.default)(res, {
            message: "file not found",
            success: false,
            data: null,
            statusCode: 404,
        });
    }
    const url = file.path;
    if (!url) {
        return (0, sendResponse_1.default)(res, {
            message: "failed to upload image",
            success: false,
            data: null,
            statusCode: 400,
        });
    }
    const isExistUser = yield user_model_1.default.findOne({ email: user.email });
    if (!isExistUser) {
        return (0, sendResponse_1.default)(res, {
            message: "user not found",
            success: false,
            data: null,
            statusCode: 404,
        });
    }
    const result = yield user_model_1.default.findByIdAndUpdate(isExistUser._id, { image: url }, { new: true, runValidators: true });
    (0, sendResponse_1.default)(res, {
        data: result,
        message: "image updated successfully",
        statusCode: 200,
        success: true,
    });
}));
exports.updateUserInfo = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const user = req.user;
    ["email", "role", "image"].forEach((item) => delete body[item]);
    const isExistUser = yield user_model_1.default.findOne({ email: user.email });
    if (!isExistUser) {
        return (0, sendResponse_1.default)(res, {
            message: "user not found",
            success: false,
            data: null,
            statusCode: 404,
        });
    }
    const result = yield user_model_1.default.findByIdAndUpdate(isExistUser._id, body, {
        new: true,
        runValidators: true,
    });
    (0, sendResponse_1.default)(res, {
        data: result,
        message: "user profile updated successfully",
        statusCode: 200,
        success: true,
    });
}));
exports.getAllUser = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const query = user_model_1.default.find({ _id: { $ne: user._id } }).populate({
        path: "auth",
        select: "role",
    });
    const build = new QueryBuilder_1.default(query, req.query)
        .search(["firstName", "lastName", "email"])
        .paginate();
    const totalDoc = yield build.count();
    const result = yield build.modelQuery;
    res.json({
        data: result,
        success: true,
        totalDoc: totalDoc.totalCount,
        message: "successfully get all user",
    });
}));
exports.isCapableForPremium = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const post = yield post_model_1.default.findOne({ user: user, upvoteCount: { $gt: 0 } });
    (0, sendResponse_1.default)(res, {
        data: post ? true : false,
        success: true,
        message: "successfully check user capability for premium",
    });
}));
exports.generateVerifyAccountPaymentUrl = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const post = yield post_model_1.default.findOne({ user: user, upvoteCount: { $gt: 0 } });
    if (!post) {
        return (0, sendResponse_1.default)(res, {
            message: "Not capled for premium",
            success: false,
            data: null,
            statusCode: 404,
        });
    }
    const payload = {
        amount: 200,
        cus_add: "N/A",
        cus_name: user.firstName + " " + user.lastName,
        cus_phone: "N/A",
        cus_email: user.email,
        tran_id: String(Date.now()),
    };
    const result = yield (0, payment_utils_1.initiatePayment)(payload, user._id);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        message: "successfully get payment url",
    });
}));
