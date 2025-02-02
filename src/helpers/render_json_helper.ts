/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';
import { getHttpStatusMessage } from './http_status_helper';

interface JsonApiError {
  status: string;
  title: string;
  detail?: string;
}

export const renderJson = async (
  action: () => Promise<any>, // Action to execute
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await action();
    return result;
  }
  catch (error: any) {
    render500Error(reply, error)
  }
};

export const renderError = (reply: FastifyReply, statusCode: number, error?: any) => {
  const title = getHttpStatusMessage(statusCode);

  const jsonApiError: JsonApiError = {
    status: statusCode.toString(),
    title: title,
    detail: `${error.message}` || 'An unexpected error occurred',
  };

  reply.status(statusCode).send({ errors: [jsonApiError] });
};

export const render500Error = (reply: FastifyReply, error?: any) => {
  renderError(reply, 500, error)
}

export const render404Error = (reply: FastifyReply, error?: any) => {
  renderError(reply, 404, error)
}

export const render403Error = (reply: FastifyReply, error?: any) => {
  renderError(reply, 403, error)
}

export const render401Error = (reply: FastifyReply, error?: any) => {
  renderError(reply, 401, error)
}

export const render400Error = (reply: FastifyReply, error?: any) => {
  renderError(reply, 400, error)
}