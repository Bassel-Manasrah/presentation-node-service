import { object, string, array } from "yup";

// schema to validate the parameters for adding a presentation
export const addPresentationSchema = object({
  body: object({
    // `title` is a required string field
    title: string()
      .required("title field is required")
      .notOneOf([""], "title field cannot be an empty string"),
    // `authors` is an array of strings
    authors: array()
      .of(string().notOneOf([""], "author cannot be an empty string"))
      .required("authors field is required"),
  }),
});

// schema to validate the parameters for getting a presentation by title
export const getPresentationByTitleSchema = object({
  param: object({
    // `title` is a required string parameter
    title: string()
      .required("title field is required")
      .notOneOf([""], "title field cannot be an empty string"),
  }),
});

// schema to validate the parameters for deleting a presentation
export const deletePresentationSchema = getPresentationByTitleSchema;
