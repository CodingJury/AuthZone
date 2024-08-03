import { Response } from "express";
import { HttpStatus } from "./HttpStatus.helper";
import { parseStack } from "../formats/ErrorStack.format";

export function handleSuccess(
  res: Response, 
  message: string = "OK", 
  data: any = null, 
  status: HttpStatus = HttpStatus.OK
) {
  return res.status(status).json({
    status: 'success',
    message,
    data
  })
}

export function handleError(
  res: Response,
  message = "Internal Server Error",
  error: any = null,
  status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
) {
  if(error) {
    console.log('------ERROR START-------')
    if (process.env.NODE_ENV !== 'production') {
      console.error(error.stack);
    } else {
      console.error(error.message);
    }
    console.log('-------ERROR END--------')
  }

  return res.status(status).json({
    status: "error",
    message,
    ...((process.env.NODE_ENV !== 'production' && error) ? { stack: parseStack(error).stack } : { description: error?.message })
  })
}