import { Response } from "express";
import { HttpStatus } from "./HttpStatus.helper";

export function handleSuccess(
  res: Response, 
  message: string = "OK", 
  data: any = null, 
  status: HttpStatus = HttpStatus.OK
) {
  res.status(status).json({
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

  console.log('------ERROR START-------')
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    console.error(error.message);
  }
  console.log('-------ERROR END--------')

  res.status(status).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV !== 'production' && { error })
  })
}