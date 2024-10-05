"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
cloudinary_1.v2.config({
    cloud_name: process.env.CN_Cloud_name,
    api_key: process.env.CN_Api_key,
    api_secret: process.env.CN_Api_secret,
});
exports.default = cloudinary_1.v2;
