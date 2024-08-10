import { Router } from "express";
import controller from "../controllers/presentation.controller";
import validate from "../middlewares/validate";
import {
  addPresentationSchema,
  deletePresentationSchema,
  getPresentationByTitleSchema,
} from "../validations/presentation.validation";

const router = Router();

// route to add a presentation
router.post(
  "/presentations",
  validate(addPresentationSchema),
  controller.handleAddPresentation
);

// route to get all presentations
router.get("/presentations", controller.handleGetAllPresentations);

// route to get a single presentation by title
router.get(
  "/presentations/:title",
  validate(getPresentationByTitleSchema),
  controller.handleGetPresentationByTitle
);

// route to delete a presentation by title
router.delete(
  "/presentations/:title",
  validate(deletePresentationSchema),
  controller.handleDeletePresentation
);

export default router;
