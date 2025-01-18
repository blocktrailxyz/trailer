import fastify, { FastifyRequest } from 'fastify'
import { Env } from 'libs/env';
import { logger, getLogOptions } from 'libs/logger';
import { register, metricsMiddleware } from 'middlewares/metrics';

const server = fastify({ logger: getLogOptions() })


const env = new Env(process.env);
const port = parseInt(env.fetch('APP_PORT', '8080'));

server.log.info(`server is booting on port: ${port}`);
logger.info(`server is booting on port--: ${port}`);

// Assign unique request IDs
server.addHook('onRequest', (request, reply, done) => {
  request.id = `req-${Date.now()}`;
  done();
});

// Use metrics middleware
metricsMiddleware(server);

server.get('/', async (request: FastifyRequest) => {
  logger.info(`${request.id} Handling root route`);
  return { message: 'Hello, world!' };
});

server.get('/ping', async () => {
  return 'pong\n'
});


// Expose /metrics endpoint for Prometheus
server.get('/metrics', async (_request, reply) => {
  reply.header('Content-Type', register.contentType);
  return register.metrics();
});


server.listen({ port: port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    logger.error(err)
    process.exit(1)
  }
  logger.info(`Server listening at ${address}`)
})