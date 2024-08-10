import { Request, Response } from "express";
import {
  addSlide,
  deleteSlide,
  isValidSlide,
  updateSlide,
} from "../services/slide.service";

/*
  handler for adding a slide to a presentation
*/
const handleAddSlide = async (req: Request, res: Response): Promise<void> => {
  const { presentationTitle } = req.params;
  const { title: slideTitle, content: slideContent } = req.body;

  const updatedPresentation = await addSlide(
    presentationTitle,
    slideTitle,
    slideContent
  );
  res
    .status(201)
    .json({ status: "success", presentation: updatedPresentation });
};

/*
  handler for updating a slide
*/
const handleUpdateSlide = async (req: Request, res: Response) => {
  const { presentationTitle, slideIndex } = req.params;
  const { title: slideTitle, content: slideContent } = req.body;
  const index = parseInt(slideIndex);

  const validSlide = await isValidSlide(presentationTitle, index);
  if (!validSlide) {
    return res.status(400).json({ error: "invalid slide" });
  }
  const updatedPresentation = await updateSlide(
    presentationTitle,
    index,
    slideTitle,
    slideContent
  );
  res
    .status(200)
    .json({ status: "success", presentation: updatedPresentation });
};

/*
  handler for deleting a slide
*/
const handleDeleteSlide = async (req: Request, res: Response) => {
  const { presentationTitle, slideIndex } = req.params;
  let index = parseInt(slideIndex);

  const validSlide = await isValidSlide(presentationTitle, index);
  if (validSlide) {
    const updatedPresentation = await deleteSlide(
      presentationTitle,
      parseInt(slideIndex)
    );
    res
      .status(200)
      .json({ status: "success", presentation: updatedPresentation });
  } else {
    return res.status(400).json({ error: "invalid slide" });
  }
};

export default { handleAddSlide, handleUpdateSlide, handleDeleteSlide };
