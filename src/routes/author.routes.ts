import { Router } from "express";
import controller from "../controllers/author.controller";
import validate from "../middlewares/validate";
import { updateAuthorsSchema } from "../validations/author.validation";

const router = Router();

router.put(
  "/presentations/:presentationTitle/authors",
  validate(updateAuthorsSchema),
  controller.handelUpdateAuthors
);

export default router;
