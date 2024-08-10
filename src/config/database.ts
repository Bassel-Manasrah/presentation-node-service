import mongoose from "mongoose";

// function to connect to the MongoDB database
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
  } catch (err) {
    console.log(err);
  }
};
