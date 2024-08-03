import { Request, Response } from "express";
import { handleError, handleSuccess } from "../utils/helpers/Resopnse.helper";
import { HttpStatus } from "../utils/helpers/HttpStatus.helper";

export function login(req: Request, res: Response) {
  try {
    handleSuccess(res)
  } catch(err) {
    handleError(res)
  }
}

export function register(req: Request, res: Response) {
  const { body } = req
  console.log(body)

  try {
    handleSuccess(res)
  } catch(err) {
    handleError(res)
  }
}