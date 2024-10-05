"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinaryMulter_config_1 = require("../../config/cloudinaryMulter.config");
const auth_1 = require("../../middlewares/auth");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.get("/all", auth_1.isAuthenticatedUser, (0, auth_1.authorizeRoles)("admin"), user_controller_1.getAllUser);
router.put("/update", auth_1.isAuthenticatedUser, user_controller_1.updateUserInfo);
router.get("/can-have-premium", auth_1.isAuthenticatedUser, user_controller_1.isCapableForPremium);
router.post("/get-verify-url", auth_1.isAuthenticatedUser, user_controller_1.generateVerifyAccountPaymentUrl);
router.put("/update-profile-image", auth_1.isAuthenticatedUser, cloudinaryMulter_config_1.multerUpload.single("file"), user_controller_1.updateUserProfileImage);
const userRoute = router;
exports.default = userRoute;
