import { Request, Response } from "express";
import EmailService from "../services/Email.service";
import { handleError } from "../utils/helpers/SuccessError.helper";
import { sendResponse } from "../utils/helpers/Response.helper";

export async function verifyEmail(req: Request, res: Response) {
  const { token } = req.query

  try {
    const verifyEmailResponse = await EmailService.verifyEmail(token as string);
    sendResponse(res, verifyEmailResponse)
  } catch(err) {
    sendResponse(res, handleError("Unable to verify email", err))
  }
}