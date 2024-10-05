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
exports.followerController = void 0;
const catchAsyncError_1 = require("../../../utils/catchAsyncError");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const follower_service_1 = require("./follower.service");
const createFollowerController = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const { follower } = req.body;
    const payload = {
        user,
        follower,
    };
    const result = yield follower_service_1.followerService.createFollower(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Follower created successfully",
        data: result,
    });
}));
const deleteFollowerController = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const { follower } = req.body;
    const payload = {
        user,
        follower,
    };
    const result = yield follower_service_1.followerService.deleteFollower(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Follower deleted successfully",
        data: result,
    });
}));
const getFollowers = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const result = yield follower_service_1.followerService.getFollowers(user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "No Data Found",
        data: result,
    });
}));
exports.followerController = {
    createFollowerController,
    deleteFollowerController,
    getFollowers,
};
