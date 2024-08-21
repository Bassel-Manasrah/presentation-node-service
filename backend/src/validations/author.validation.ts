import { object, string, number } from "yup";

// schema to validate the parameters for updating authors of a presentation
export const updateAuthorsSchema = object({
  param: object({
    // `presentationTitle` is a required string parameter
    presentationTitle: string()
      .required("presentation title parameter is required")
      .notOneOf([""], "presentation title parameter cannot be an empty string"),
  }),
});
