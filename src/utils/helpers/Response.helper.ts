import { Response } from "express";
import { ServiceResponse } from "./SuccessError.helper";

export function sendResponse(
  res: Response,
  serviceResponse: ServiceResponse
): Response {
  const {status, response: {statusCode, ...other}} = serviceResponse;
  return res.status(statusCode).json({status , ...other})
}