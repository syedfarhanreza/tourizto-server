import express from "express";
import userRoute from "../modules/user/user.route";
import authRoute from "../modules/auth/auth.route";
import postRoute from "../modules/post/post.route";

const router = express.Router();

const moduleRoute = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/post",
    route: postRoute,
  },
  

];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
