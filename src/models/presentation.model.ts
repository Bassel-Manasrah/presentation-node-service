import mongoose, { Schema, Document } from "mongoose";
import { ISlide, SlideSchema } from "./slide.model";

// interface to define the shape of the Presentation document
export interface IPresentation extends Document {
  title: string;
  authors: string[];
  slides: ISlide[];
}

// define the schema for the Presentation model
const PresentationSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  authors: { type: [String], required: true },
  slides: { type: [SlideSchema], required: true },
});

// create and export the Presentation model using the schema
export default mongoose.model<IPresentation>(
  "Presentation",
  PresentationSchema
);
