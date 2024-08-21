import Presentation, { IPresentation } from "../models/presentation.model";

/**
 * Retrieves all presentations from the database.
 * @returns A promise that resolves to an array of all presentations.
 */
export const getAllPresentations = async (): Promise<IPresentation[]> => {
  return Presentation.find();
};

/**
 * Retrieves a specific presentation by its title.
 *
 * @param title - The title of the presentation to retrieve.
 * @returns A promise that resolves to the presentation with the specified title, or null if not found.
 */
export const getPresentationByTitle = async (
  title: String
): Promise<IPresentation | null> => {
  return await Presentation.findOne({ title });
};

/**
 * Adds a new presentation to the database.
 *
 * @param title - The title of the new presentation.
 * @param authors - An array of authors for the new presentation.
 * @returns A promise that resolves to the newly created presentation.
 */
export const addPresentation = async (
  title: string,
  authors: string[]
): Promise<IPresentation> => {
  return await Presentation.create({ title, authors, slides: [] });
};

/**
 * Deletes a specific presentation by its title.
 *
 * @param title - The title of the presentation to delete.
 * @returns A promise that resolves to the deleted presentation, or null if not found.
 */
export const deletePresentation = async (
  title: string
): Promise<IPresentation | null> => {
  return await Presentation.findOneAndDelete({ title });
};

/**
 * Retrieves the number of slides in a specific presentation.
 *
 * @param presentationTitle - The title of the presentation whose slide count is to be retrieved.
 * @returns A promise that resolves to the number of slides, or null if the presentation is not found.
 */
export const getLength = async (
  presentationTitle: string
): Promise<number | null> => {
  const presentation = await getPresentationByTitle(presentationTitle);
  if (!presentation) return null;
  return presentation.slides.length;
};

/**
 * Checks if a presentation exists by its title.
 *
 * @param title - The title of the presentation to check.
 * @returns A promise that resolves to true if the presentation exists, otherwise false.
 */
export const presentationExist = async (title: string): Promise<boolean> => {
  const presentation = await Presentation.findOne({ title });
  return !!presentation;
};
