/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/controllerWrapper.ts
import { AppError } from "errors/app_error";
import { FastifyReply, FastifyRequest } from "fastify";
import { renderError } from "helpers/render_json_helper";

export function handleControllerError(reply: FastifyReply, error: unknown) {
  if (error instanceof AppError) {
    renderError(reply, error.statusCode, error);
  } else {
    renderError(reply, 500, error);
  }
}

export function baseControllerEntry(
  controllerAction: (req: FastifyRequest<any>, reply: FastifyReply) => Promise<unknown>
) {
  return async (req: FastifyRequest<any>, reply: FastifyReply) => {
    try {
      const result = await controllerAction(req, reply);
      return result
    }
    catch (error) {
      handleControllerError(reply, error);
    }
  };
}
