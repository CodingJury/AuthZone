import { NextFunction, Request, Response } from "express";
import { parseStack } from "../utils/formats/ErrorStack.format";
import { handleError } from "../utils/helpers/SuccessError.helper";
import { sendResponse } from "../utils/helpers/Response.helper";

export function globalErrorMiddleare(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('---------------------------------------------------------------------------')
  console.log('---------------------GLOBAL ERROR MIDDLEWARE TRIGGERED---------------------')
  console.log('---------------------------------------------------------------------------')
  const parsedError = parseStack(err)
  sendResponse(res, handleError(parsedError.message, parsedError.stack))
}