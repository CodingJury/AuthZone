import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils/helpers/Resopnse.helper";
import { parseStack } from "../utils/formats/ErrorStack.format";

export function globalErrorMiddleare(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('---------------------------------------------------------------------------')
  console.log('---------------------GLOBAL ERROR MIDDLEWARE TRIGGERED---------------------')
  console.log('---------------------------------------------------------------------------')
  const parsedError = parseStack(err)
  handleError(res, parsedError.message, parsedError.stack)
}