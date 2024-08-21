import mongoose, { Schema, Document } from "mongoose";

// interface to define the shape of the Slide document
export interface ISlide {
  title: string;
  content: string;
}

// define the schema for the Slide model
export const SlideSchema: Schema = new Schema({
  title: { type: String, default: "" },
  content: { type: String, default: "" },
});

// create and export the Slide model using the schema
export default mongoose.model<ISlide>("Slide", SlideSchema);
