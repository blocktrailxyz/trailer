import fastify from 'fastify'
import { getLogOptions } from 'libs/logger';
import { metricsMiddleware } from 'middlewares/metrics_middleware';
import routes from 'routes/index_route';
import requestIdMiddleware from 'middlewares/request_id_middleware';
import registerCors from 'middlewares/cors_registration_middleware';

const app = fastify({ logger: getLogOptions() })

// register cors
registerCors(app);

// Assign unique request IDs
requestIdMiddleware(app);

// Use metrics middleware
metricsMiddleware(app);

// authenticator handdler
// preHandler: [authenticatorMiddleware],

// Register routes
app.register(routes);

export default app;