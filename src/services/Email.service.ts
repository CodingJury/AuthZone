import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { verifyJwt } from "../utils/adhoc/jwt";
import { handleError, handleSuccess } from "../utils/helpers/SuccessError.helper"

class EmailService {
  static async verifyEmail(token: string) {
    const jwtResponse = verifyJwt(token, "EMAIL")
    if(!jwtResponse.status) return handleError(jwtResponse.message)
    if(!jwtResponse?.data?.email) return handleError("Invalid URL")
    const { email } = jwtResponse.data

    const userExists = await prisma.user.findUnique({ where: { email } })
    if(!userExists) return handleError("User unavailable")
    if(userExists.isEmailVerified) return handleSuccess("Email already verified.")
      
    await prisma.user.update({ 
      where: { email},
      data: { isEmailVerified: true }
    })
    return handleSuccess("Email verified succeessfully.")
  }
}

export default EmailService;