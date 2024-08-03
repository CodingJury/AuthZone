import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { handleError } from "../utils/helpers/Resopnse.helper";
import { HttpStatus } from "../utils/helpers/HttpStatus.helper";

export const validateBody = (bodySchema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = bodySchema.parse(req.body);
    next()
  } catch(error: any) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map(e => e.message).join(', ');
      handleError(res, "BodySchema Validation Error", formattedErrors, HttpStatus.BAD_REQUEST)
    } else {
      next(error)
    }
  }
}