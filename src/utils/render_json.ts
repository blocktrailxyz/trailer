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
    request.log.error(error);

    const jsonApiError: JsonApiError = {
      status: '500',
      title: 'Internal Server Error',
      detail: error.message || 'An unexpected error occurred',
    };

    reply.status(500).send({ errors: [jsonApiError] });
  }
};
