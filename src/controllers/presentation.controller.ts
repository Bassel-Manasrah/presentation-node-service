import { Request, Response } from "express";
import {
  addPresentation,
  deletePresentation,
  getAllPresentations,
  getPresentationByTitle,
} from "../services/presentation.service";

/*
  handler for adding a new presentation
*/
const handleAddPresentation = async (req: Request, res: Response) => {
  const { title, authors } = req.body;
  const newPresentation = await addPresentation(title, authors);
  return res
    .status(201)
    .json({ status: "success", presentation: newPresentation });
};

/*
  handler for getting a single presentation by title
  each presentation has a unique title
*/
const handleGetPresentationByTitle = async (req: Request, res: Response) => {
  const { title } = req.params;
  const presentation = await getPresentationByTitle(title);

  // respond with error if presentation is not found
  if (presentation === null) {
    return res.status(404).send({ error: "invalid presentation title" });
  }

  // respond with the found presentation if it is found
  return res.status(200).json(presentation);
};

/*
  handler for getting all presentations
*/
const handleGetAllPresentations = async (req: Request, res: Response) => {
  const presentations = await getAllPresentations();
  res.status(200).json(presentations);
};

/*
  handler for deleting a single representation by title
*/
const handleDeletePresentation = async (req: Request, res: Response) => {
  const { title } = req.params;
  const presentation = await deletePresentation(title);

  // respond with deleted presentation
  res.status(200).json({ status: "success", presentation });
};

const presentationController = {
  handleAddPresentation,
  handleGetPresentationByTitle,
  handleGetAllPresentations,
  handleDeletePresentation,
};

export default presentationController;
