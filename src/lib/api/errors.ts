type ErrorCode = "BAD_REQUEST" | "NOT_FOUND" | "INTERNAL_ERROR" | "UNAUTHORIZED";

interface ErrorBody {
  error: {
    code: ErrorCode;
    message: string;
    details?: unknown;
  };
}

function build(code: ErrorCode, message: string, details?: unknown): ErrorBody {
  const body: ErrorBody = { error: { code, message } };
  if (details !== undefined) body.error.details = details;
  return body;
}

export function badRequest(message: string, details?: unknown): Response {
  return Response.json(build("BAD_REQUEST", message, details), { status: 400 });
}

export function notFound(message: string, details?: unknown): Response {
  return Response.json(build("NOT_FOUND", message, details), { status: 404 });
}

export function serverError(message: string, details?: unknown): Response {
  return Response.json(build("INTERNAL_ERROR", message, details), {
    status: 500,
  });
}
export function unauthorized(message: string, details?: unknown): Response {
  return Response.json(build("UNAUTHORIZED", message, details), {
    status: 401,
  });
}