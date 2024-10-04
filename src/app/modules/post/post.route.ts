import { Router } from "express";
import {
  isAuthenticatedUser,
  isAuthenticatedUserOptional,
} from "../../middlewares/auth";
import { validSchema } from "../../middlewares/validator";
import { postController } from "./post.controller";
import { postValidationSchema } from "./post.validation";
import { multerUpload } from "../../config/cloudinaryMulter.config";
const router = Router();
router.post(
  "/create",
  isAuthenticatedUser,
  validSchema(postValidationSchema),
  postController.createPost
);
router.post(
  "/upload-image",
  isAuthenticatedUser,
  multerUpload.single("file"),
  postController.uploadPostImage
);

router.delete(
  "/delete/:postId",
  isAuthenticatedUser,
  postController.deletePost
);
router.get("/get", isAuthenticatedUserOptional, postController.getAllPosts);
router.get("/get/:id", postController.getPostById);
router.patch("/vote/:postId", isAuthenticatedUser, postController.votePost);
const postRoute = router;

export default postRoute;