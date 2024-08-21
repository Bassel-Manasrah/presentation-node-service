import { AnySchema, ValidationError } from "yup";
import { NextFunction, Request, Response } from "express";

// middleware function to validate request data using Yup schemas
const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validate the request data against the provided schema
      await schema.validate({
        body: req.body,
        query: req.query,
        param: req.params,
      });
      return next();
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ error: e.message });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };

export default validate;
