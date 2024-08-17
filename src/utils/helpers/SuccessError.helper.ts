import { parseStack } from "../formats/ErrorStack.format";
import { HttpStatus } from "./HttpStatus.helper";

export interface ServiceResponse {
  status: 'success' | 'error';
  response: {
    statusCode: HttpStatus;
    message: string;
    data?: any;
    stack?: string[];
    description?: string;
  };
}

export function handleSuccess(
  message: string = "OK",
  data: any = null,
  statusCode: HttpStatus = HttpStatus.OK
): ServiceResponse {
  return {
    status: 'success',
    response: {
      statusCode,
      message,
      data,
    },
  };
}

export function handleError(
  message = "Internal Server Error",
  error: any = null,
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
): ServiceResponse {
  const result: ServiceResponse = {
    status: "error",
    response: {
      statusCode,
      message,
    }
  }
  
  if(error) {
    console.log('------ERROR START-------')
    if (process.env.NODE_ENV !== 'production') {
      result.response.stack = error instanceof Error ? parseStack(error).stack : error
      console.log("STACK : ", result.response.stack)
    } else {
      result.response.description = error instanceof Error ? error.message : error
      console.log("DESCRIPTION : ", result.response.description)
    }
    console.log('-------ERROR END--------')
  }

  return result;
}