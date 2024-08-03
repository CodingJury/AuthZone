import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request, Response } from "express";
import { handleError, handleSuccess } from "../utils/helpers/Resopnse.helper";
import { HttpStatus } from "../utils/helpers/HttpStatus.helper";
import { sendEmail } from "../utils/communications/Email.communication";
import { generateJwt } from "../utils/adhoc/jwt";

export function login(req: Request, res: Response) {
  try {
    handleSuccess(res)
  } catch (err) {
    handleError(res)
  }
}

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body

  try {
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) return handleError(res, "Email already registered. Please try registering with another email")

    const user = await prisma.user.create({ data: { email, password, firstName, lastName } })

    const jwtToken = generateJwt({email}, "EMAIL", "5m")
    const verificationLink = `${process.env.BASE_URL}/email/verify-email?token=${jwtToken}`;
    let emailSent = false;
    try {
      await sendEmail("EMAIL_VERIFICATION", {to: email}, {name: `${firstName} ${lastName}`, url: verificationLink});
      emailSent = true;
    } catch (emailError) {
      console.log("Failed to send verification email:", emailError)
    }

    if(emailSent) {
      handleSuccess(res, "User registered successfully. Verification link is sent to your registered email.", null, HttpStatus.CREATED)
    } else {
      handleSuccess(res, "User registered successfully. Unfortunately, an email service is down, so please try after some time.", null, HttpStatus.CREATED)
    }
  } catch (err) {
    handleError(res, "Unable to register user", err)
  }
}