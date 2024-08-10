import express, { Router } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes setup
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
