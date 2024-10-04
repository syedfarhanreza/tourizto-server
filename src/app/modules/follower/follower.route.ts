import { Router } from "express";
import { isAuthenticatedUser } from "../../middlewares/auth";
import { followerController } from "./follower.controller";
const router = Router();
router.get("/get", isAuthenticatedUser, followerController.getFollowers);
router.post(
  "/create",
  isAuthenticatedUser,
  followerController.createFollowerController
);
router.delete(
  "/delete",
  isAuthenticatedUser,
  followerController.deleteFollowerController
);
const followerRoute = router;
export default followerRoute;