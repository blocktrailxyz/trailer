import { FastifyInstance } from "fastify";
// import { AppLog } from "libs/app_log";

const requestIdMiddleware = (fastify: FastifyInstance): void => {
  // AppLog.getInstance().info('requestIdMiddleware middleware registered');
  // Assign unique request IDs
  fastify.addHook('onRequest', (request, reply, done) => {
    request.id = `req-${Date.now()}`;
    done();
  });
}

export default requestIdMiddleware;