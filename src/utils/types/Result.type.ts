interface SuccessResult {
  status: true,
  data: any
}

interface ErrorResult {
  status: false,
  message: string
}

export type Result = SuccessResult | ErrorResult