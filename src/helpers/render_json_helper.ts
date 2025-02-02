/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';

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

export const render500Error = (reply: FastifyReply, error: any) => {
  const statusCode = 500

  const jsonApiError: JsonApiError = {
    status: statusCode.toString(),
    title: 'Internal Server Error',
    detail: error.message || 'An unexpected error occurred',
  };

  reply.status(statusCode).send({ errors: [jsonApiError] });
}

export const render404Error = (reply: FastifyReply, errorMessage?: any) => {
  const statusCode = 404

  const jsonApiError: JsonApiError = {
    status: statusCode.toString(),
    title: 'Not Found',
    detail: errorMessage || 'Resource is not found',
  };

  reply.status(statusCode).send({ errors: [jsonApiError] });
}

export const render403Error = (reply: FastifyReply, errorMessage?: any) => {
  const statusCode = 403

  const jsonApiError: JsonApiError = {
    status: statusCode.toString(),
    title: 'Forbidden',
    detail: errorMessage || 'Forbidden',
  };

  reply.status(statusCode).send({ errors: [jsonApiError] });
}

export const render401Error = (reply: FastifyReply, errorMessage?: any) => {
  const statusCode = 401

  const jsonApiError: JsonApiError = {
    status: statusCode.toString(),
    title: 'Unauthorized',
    detail: errorMessage || 'Unauthorized',
  };

  reply.status(statusCode).send({ errors: [jsonApiError] });
}

export const render400Error = (reply: FastifyReply, errorMessage?: any) => {
  const statusCode = 400

  const jsonApiError: JsonApiError = {
    status: statusCode.toString(),
    title: 'Bad Request',
    detail: errorMessage || 'Bad Request',
  };

  reply.status(statusCode).send({ errors: [jsonApiError] });
}

