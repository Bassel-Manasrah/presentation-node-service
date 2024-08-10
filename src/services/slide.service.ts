import Presentation, { IPresentation } from "../models/presentation.model";
import { ISlide } from "../models/slide.model";
import { getLength, getPresentationByTitle } from "./presentation.service";

/**
 * Adds a new slide to a presentation.
 *
 * @param presentationTitle - The title of the presentation to which the slide is to be added.
 * @param slideTitle - The title of the slide to be added.
 * @param slideContent - The content of the slide to be added.
 * @returns A promise that resolves to the updated presentation with the new slide, or null if the presentation is not found.
 */
export const addSlide = async (
  presentationTitle: string,
  slideTitle: string,
  slideContent: string
): Promise<IPresentation | null> => {
  return await Presentation.findOneAndUpdate(
    { title: presentationTitle },
    { $push: { slides: { title: slideTitle, content: slideContent } } }
  );
};

/**
 * Retrieves a specific slide from a presentation by index.
 *
 * @param presentationTitle - The title of the presentation containing the slide.
 * @param slideIndex - The index of the slide to retrieve.
 * @returns A promise that resolves to the slide at the specified index, or null if the presentation or slide is not found.
 */
export const getSlide = async (
  presentationTitle: string,
  slideIndex: number
): Promise<ISlide | null> => {
  const presentation = await getPresentationByTitle(presentationTitle);
  if (!presentation) return null;
  return presentation.slides[slideIndex];
};

/**
 * Updates a specific slide in a presentation.
 *
 * @param presentationTitle - The title of the presentation containing the slide.
 * @param slideIndex - The index of the slide to update.
 * @param slideTitle - The new title for the slide.
 * @param slideContent - The new content for the slide.
 * @returns A promise that resolves to the updated presentation, or null if the presentation is not found.
 */
export const updateSlide = async (
  presentationTitle: string,
  slideIndex: number,
  slideTitle: string,
  slideContent: string
): Promise<IPresentation | null> => {
  const presentation = await getPresentationByTitle(presentationTitle);
  if (!presentation) return null;

  presentation.slides[slideIndex] = {
    title: slideTitle,
    content: slideContent,
  };

  await presentation.save();
  return presentation;
};

/**
 * Deletes a specific slide from a presentation by index.
 *
 * @param presentationTitle - The title of the presentation containing the slide.
 * @param slideIndex - The index of the slide to delete.
 * @returns A promise that resolves to the updated presentation after the slide has been removed, or null if the presentation is not found.
 */
export const deleteSlide = async (
  presentationTitle: string,
  slideIndex: number
): Promise<IPresentation | null> => {
  const presentation = await Presentation.findOne({ title: presentationTitle });
  if (!presentation) return null;

  presentation.slides.splice(slideIndex, 1);
  await presentation.save();
  return presentation;
};

/**
 * Checks if a slide index is valid for a given presentation.
 *
 * @param presentationTitle - The title of the presentation to check.
 * @param slideIndex - The index of the slide to validate.
 * @returns A promise that resolves to true if the slide index is valid, otherwise false.
 */
export const isValidSlide = async (
  presentationTitle: string,
  slideIndex: number
): Promise<boolean> => {
  const presentationLength = await getLength(presentationTitle);
  if (presentationLength === null || slideIndex >= presentationLength)
    return false;
  return true;
};
