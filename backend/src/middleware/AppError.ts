export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function badRequest(message: string = 'Bad request'): AppError {
  return new AppError(message, 400);
}

export function unauthorized(message: string = 'Unauthorized'): AppError {
  return new AppError(message, 401);
}

export function forbidden(message: string = 'Forbidden'): AppError {
  return new AppError(message, 403);
}

export function notFound(message: string = 'Resource not found'): AppError {
  return new AppError(message, 404);
}

export function conflict(message: string = 'Conflict'): AppError {
  return new AppError(message, 409);
}

export function unprocessable(
  message: string = 'Unprocessable entity',
): AppError {
  return new AppError(message, 422);
}

export function internal(message: string = 'Internal server error'): AppError {
  return new AppError(message, 500);
}
