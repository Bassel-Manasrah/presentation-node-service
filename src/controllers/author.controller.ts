import { Request, Response } from "express";
import { updateAuthors } from "../services/author.service";

/*
  handler for updating authors for a presentation
*/
const handelUpdateAuthors = async (req: Request, res: Response) => {
  const { presentationTitle } = req.params;
  const { authors } = req.body;

  const updatedPresentation = await updateAuthors(presentationTitle, authors);

  // check if the presentation was updated successfully
  if (!updatedPresentation) {
    return res.status(400).json("invalid presentation title");
  }
  // respond with success and updated presentation details
  return res
    .status(200)
    .json({ status: "success", presentation: updatedPresentation });
};

const authorController = {
  handelUpdateAuthors,
};

export default authorController;
