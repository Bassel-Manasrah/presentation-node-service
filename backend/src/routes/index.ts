import { Router } from "express";
import presentationRouter from "./presentation.routes";
import slideRouter from "./slide.routes";
import authorRouter from "./author.routes";

const router = Router()
  .use("/", presentationRouter)
  .use("/", slideRouter)
  .use("/", authorRouter);

export default router;
