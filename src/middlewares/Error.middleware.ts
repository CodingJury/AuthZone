import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils/helpers/Resopnse.helper";
import { parseStack } from "../utils/formats/ErrorStack.format";

export function globalErrorMiddleare(err: any, req: Request, res: Response, next: NextFunction) {
  const parsedError = parseStack(err)
  handleError(res, parsedError.message, parsedError.stack)
}