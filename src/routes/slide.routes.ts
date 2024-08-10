import { Router } from "express";
import controller from "../controllers/slide.controller";
import validate from "../middlewares/validate";
import {
  addSlideSchema,
  deleteSlideSchema,
  updateSlideSchema,
} from "../validations/slide.validation";

const router = Router();

// route to add a new slide to a presentation
router.post(
  "/presentations/:presentationTitle/slides",
  validate(addSlideSchema),
  controller.handleAddSlide
);

// route to update a slide
router.put(
  "/presentations/:presentationTitle/slides/:slideIndex",
  validate(updateSlideSchema),
  controller.handleUpdateSlide
);

// route to delete a slide
router.delete(
  "/presentations/:presentationTitle/slides/:slideIndex",
  validate(deleteSlideSchema),
  controller.handleDeleteSlide
);

export default router;
