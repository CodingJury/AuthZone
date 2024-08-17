import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import bcrypt from "bcryptjs"
import { generateJwt } from "../utils/adhoc/jwt";
import { sendEmail } from "../utils/communications/Email.communication";
import { HttpStatus } from "../utils/helpers/HttpStatus.helper";
import { handleError, handleSuccess } from "../utils/helpers/SuccessError.helper";
import { LoginBodySchema, RegisterBodySchema } from "../utils/validations/Auth.validation";

const PASSWORD_SALT_VERSION = 10;

class UserService {
  static async loginUser({email, password}: LoginBodySchema) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return handleError("Invalid Credentials")
      
    const {password:hashPassword, ...other} = user;

    const isPasswordMatched = await bcrypt.compare(password, hashPassword);
    if (!isPasswordMatched) return handleError("Invalid Credentials")

    return handleSuccess("User Login Successfully", other)
  }

  static async registerUser({ email, password, firstName, lastName }: RegisterBodySchema) {
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) return handleError("Email already registered. Please try registering with another email")

    const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_VERSION)
    const user = await prisma.user.create({ data: { email, password: hashedPassword, firstName, lastName } })

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
      return handleSuccess("User registered successfully. Verification link is sent to your registered email.", null, HttpStatus.CREATED)
    } else {
      return handleSuccess("User registered successfully. Unfortunately, an email service is down, so please verify your email later", null, HttpStatus.CREATED)
    }
  }
}

export default UserService;