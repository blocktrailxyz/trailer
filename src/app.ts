import fastify from 'fastify'
import fastifyCors from '@fastify/cors';
import { Env } from 'libs/env';
import { getLogOptions } from 'libs/logger';
import { metricsMiddleware } from 'middlewares/metrics';
import routes from 'routes';

const app = fastify({ logger: getLogOptions() })

const env = new Env(process.env);
const port = parseInt(env.fetch('APP_PORT', '8080'));

app.register(fastifyCors, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  origin: (origin: any, callback:any) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Allow specific origins
    const allowedOrigins = [env.fetch('FRONTEND_HOST')];
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Reject others
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // Allow cookies and authentication headers
});

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