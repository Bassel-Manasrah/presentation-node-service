import Presentation, { IPresentation } from "../models/presentation.model";

/**
 * Updates the authors list for a presentation.
 *
 * @param presentationTitle - The title of the presentation to update.
 * @param authors - The new list of authors to set for the presentation.
 * @returns The updated presentation document if found, or null if not found.
 *
 */
export const updateAuthors = async (
  presentationTitle: string,
  authors: string[]
): Promise<IPresentation | null> => {
  return Presentation.findOneAndUpdate(
    { title: presentationTitle },
    { $set: { authors } },
    { new: true }
  );
};

/**
 * Adds a new author to the authors list of a presentation.
 *
 * @param presentationTitle - The title of the presentation to update.
 * @param author - The author to add to the presentation's authors list.
 * @returns The updated list of authors if the presentation is found, or null if not found.
 *
 */
export const addAuthor = async (
  presentationTitle: string,
  author: string
): Promise<string[] | null> => {
  const result = await Presentation.findOneAndUpdate(
    { title: presentationTitle },
    { $push: { authors: author } },
    { new: true }
  );
  return result ? result.authors : null;
};

/**
 * Removes an author from the authors list of a presentation.
 *
 * @param presentationTitle - The title of the presentation to update.
 * @param author - The author to remove from the presentation's authors list.
 * @returns The updated list of authors if the presentation is found, or null if not found.
 *
 */
export const deleteAuthor = async (
  presentationTitle: string,
  author: string
): Promise<string[] | null> => {
  const result = await Presentation.findOneAndUpdate(
    { title: presentationTitle },
    { $pull: { authors: author } },
    { new: true }
  );
  return result ? result.authors : null;
};

/**
 * Retrieves the list of authors for a presentation.
 *
 * @param presentationTitle - The title of the presentation to fetch.
 * @returns The list of authors if the presentation is found, or null if not found.
 *
 */
export const getAuthors = async (
  presentationTitle: string
): Promise<string[] | null> => {
  const presentation = await Presentation.findOne({ title: presentationTitle });
  return presentation ? presentation.authors : null;
};
