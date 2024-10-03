import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";
import { categoryController } from "./category.controller";
const router = Router();
router.get("/get/:label", categoryController.getCategoriesByName);
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  categoryController.createCategory
);
const categoryRoute = router;
export default categoryRoute;