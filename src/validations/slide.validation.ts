import { object, string, number } from "yup";

// schema to validate the parameters for getting slides of a presentation
export const getSlidesSchema = object().shape({
  param: object({
    presentationTitle: string()
      .required("presentation title parameter is required")
      .notOneOf([""], "presentation title parameter cannot be an empty string"),
  }),
});

// schema to validate the parameters for adding a slide
export const addSlideSchema = object().shape({
  body: object({
    title: string().defined(),
    content: string().defined(),
    index: number().required("index field is required"),
  }),
});

// schema to validate the parameters for updating a slide
export const updateSlideSchema = object().shape({
  param: object({
    presentationTitle: string()
      .required("presentation title parameter is required")
      .notOneOf([""], "presentation title parameter cannot be an empty string"),
    slideIndex: number()
      .required("slide index parameter is required")
      .integer("slide index parameter should be an integer")
      .min(0, "slide index parameter should be non negative"),
  }),
  body: object({
    title: string().defined(),
    content: string().defined(),
  }),
});

// schema to validate the parameters for deleting a slide
export const deleteSlideSchema = object().shape({
  param: object({
    presentationTitle: string()
      .required("presentation title parameter is required")
      .notOneOf([""], "presentation title parameter cannot be an empty string"),
    slideIndex: number()
      .required("slide index parameter is required")
      .integer("slide index parameter should be an integer")
      .min(0, "slide index parameter should be non negative"),
  }),
});
