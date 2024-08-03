import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request, Response } from "express";
import { handleError, handleSuccess } from "../utils/helpers/Resopnse.helper";
import { verifyJwt } from "../utils/adhoc/jwt";

export async function verifyEmail(req: Request, res: Response) {
  const { token } = req.query

  try {
    const jwtResponse = verifyJwt(token as string, "EMAIL")
    if(!jwtResponse.status) return handleError(res, jwtResponse.message)
    if(!jwtResponse?.data?.email) return handleError(res, "Invalid URL")
    const { email } = jwtResponse.data

    const userExists = await prisma.user.findUnique({ where: { email } })
    if(!userExists) return handleError(res, "User unavailable")
    if(userExists.isEmailVerified) return handleSuccess(res, "Email already verified.")
      
    await prisma.user.update({ 
      where: { email},
      data: { isEmailVerified: true }
    })
    handleSuccess(res, "Email verified succeessfully.")
  } catch (err) {
    handleError(res, "Unable to verify email", err)
  }
}