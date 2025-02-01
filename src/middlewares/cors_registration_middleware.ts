import fastifyCors from "@fastify/cors";
import { FastifyInstance } from "fastify/types/instance";
import { Env } from "libs/env";

const registerCors = (fastify: FastifyInstance): void => {
  // AppLog.getInstance().info('registerCors middleware registered');

  fastify.register(fastifyCors, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    origin: (origin: any, callback:any) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        return callback(null, true);
      }

      // Allow specific origins
      const allowedOrigins = [Env.fetch('FRONTEND_HOST')];
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Reject others
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true, // Allow cookies and authentication headers
  });
}

export default registerCors;