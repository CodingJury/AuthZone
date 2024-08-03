import jwt, { JwtPayload } from "jsonwebtoken";
import { Result } from "../types/Result.type";

interface JWTPayload {
  [key: string]: any;
}
type ExpiresIn = "5m" | "10m"
type Event = "EMAIL" | "ACCESS" | "REFRESH"

const jwtSecretList: Record<Event, string> = {
  "EMAIL": process.env.JWT_EMAIL_SECRET!,
  "ACCESS": process.env.JWT_ACCESS_SECRET!,
  "REFRESH": process.env.JWT_REFRESH_SECRET!
}

export const generateJwt = (
  payload: JWTPayload,
  event: Event,
  expiresIn: ExpiresIn
) => {
  const secret:string = jwtSecretList[event]!
  return jwt.sign(payload, secret, { expiresIn })
}

export const verifyJwt = (
  jwtToken: string,
  event: Event
): Result => {
  const secret:string = jwtSecretList[event]!
  try {
    const { iat, exp, ...payload } = jwt.verify(jwtToken, secret) as JwtPayload;
    return {status: true, data: payload}
  } catch (error) {
    return {status: false, message: "Invalid or Expired Token"}
  }
}