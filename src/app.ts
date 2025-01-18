import fastify from 'fastify'
import { Env } from 'libs/env';
import { getLogOptions } from 'libs/logger';
import { metricsMiddleware } from 'middlewares/metrics';
import routes from 'routes';

const app = fastify({ logger: getLogOptions() })

const env = new Env(process.env);
const port = parseInt(env.fetch('APP_PORT', '8080'));

app.log.info(`app is booting on port: ${port}`);

// Assign unique request IDs
app.addHook('onRequest', (request, reply, done) => {
  request.id = `req-${Date.now()}`;
  done();
});

// Use metrics middleware
metricsMiddleware(app);

app.register(routes);
export default app;