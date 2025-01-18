import { FastifyInstance } from 'fastify';
import { register, metricsMiddleware } from 'middlewares/metrics';

jest.mock('prom-client', () => {
  const actual = jest.requireActual('prom-client');
  return {
    ...actual,
    collectDefaultMetrics: jest.fn(),
    Histogram: jest.fn(() => ({
      observe: jest.fn(),
    })),
    Counter: jest.fn(() => ({
      inc: jest.fn(),
    })),
  };
});

describe('Metrics', () => {
  let fastify: FastifyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    fastify = {
      addHook: jest.fn(),
      log: {
        info: jest.fn(),
        error: jest.fn(),
      },
    } as unknown as FastifyInstance;
  });

  it('should register default metrics in production', () => {
    process.env.APP_ENV = 'production';
    const { collectDefaultMetrics } = jest.requireMock('prom-client');

    metricsMiddleware(fastify);

    expect(collectDefaultMetrics).toHaveBeenCalledWith({ register });
  });

  it('should not register default metrics in non-production environments', () => {
    process.env.APP_ENV = 'development';
    const { collectDefaultMetrics } = jest.requireMock('prom-client');

    metricsMiddleware(fastify);

    expect(collectDefaultMetrics).not.toHaveBeenCalled();
  });

  it('should add hooks for request and response', () => {
    process.env.APP_ENV = 'production';

    metricsMiddleware(fastify);
    expect(fastify.addHook).toHaveBeenCalledTimes(2);
    expect(fastify.addHook).toHaveBeenCalledWith('onRequest', expect.any(Function));
    expect(fastify.addHook).toHaveBeenCalledWith('onResponse', expect.any(Function));
  });
});
