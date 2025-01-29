import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Registry, collectDefaultMetrics, Histogram, Counter } from 'prom-client';

// Create a registry to hold all metrics
const register = new Registry();

// Create custom metrics
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code', 'request_id'] as const,
  registers: [register],
});

const httpRequestCount = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code', 'request_id'] as const,
  registers: [register],
});

// Extend FastifyRequest to include a custom `metricsStart` field
interface MetricsRequest extends FastifyRequest {
  metricsStart?: [number, number]; // High-resolution timestamp from process.hrtime()
}

// Middleware to add metrics hooks
const metricsMiddleware = (fastify: FastifyInstance): void => {

  if (process.env.NODE_ENV === "production") {
    collectDefaultMetrics({ register });

  }

  // Hook to track request start time
  fastify.addHook('onRequest', (request: MetricsRequest, _reply: FastifyReply, done: () => void) => {
    request.metricsStart = process.hrtime(); // Capture the start time
    done();
  });

  // Hook to record response metrics
  fastify.addHook('onResponse', (request: MetricsRequest, reply: FastifyReply, done: () => void) => {
    if (!request.metricsStart) return done();

    const [seconds, nanoseconds] = process.hrtime(request.metricsStart);
    const duration = seconds + nanoseconds / 1e9; // Convert to seconds

    // Record metrics
    const labels = {
      method: request.method,
      route: request.url,
      status_code: reply.statusCode.toString(),
      request_id: request.id || 'unknown',
    };

    httpRequestDuration.observe(labels, duration);
    httpRequestCount.inc(labels);

    done();
  });
};

export { register, metricsMiddleware };
