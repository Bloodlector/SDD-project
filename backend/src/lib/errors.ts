export class AppError extends Error {
  constructor(
    readonly statusCode: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(what: string) {
    super(404, "not_found", `${what} not found`);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, "conflict", message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(401, "unauthorized", message);
  }
}
