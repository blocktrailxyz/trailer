// src/utils/httpStatus.ts

export const HTTP_STATUS = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict",
  422: "Unprocessable Entity",

  500: "Internal Server Error",
  501: "Not Implemented",
  503: "Service Unavailable",
} as const;

// Utility function to get the message based on the HTTP status code
export function getHttpStatusMessage(statusCode: number): string {
  return HTTP_STATUS[statusCode as keyof typeof HTTP_STATUS] || "Unknown Status";
}
