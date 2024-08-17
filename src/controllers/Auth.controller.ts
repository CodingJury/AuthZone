import { Request, Response } from "express";
import UserService from "../services/Auth.service";
import { handleError } from "../utils/helpers/SuccessError.helper";
import { sendResponse } from "../utils/helpers/Response.helper";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  try {
    const loginUserResonse = await UserService.loginUser({ email, password})
    sendResponse(res, loginUserResonse);
  } catch (err) {
    sendResponse(res, handleError('Unable to login user'))
  }
}

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body

  try {
    const registerUserResponse = await UserService.registerUser({ email, password, firstName, lastName });
    sendResponse(res, registerUserResponse)
  } catch(err) {
    sendResponse(res, handleError( "Unable to register user", err))
  }
}