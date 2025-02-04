import { getLogOptions } from 'libs/logger';

jest.mock('pino');

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return pino-pretty options in non-production environments', () => {
    process.env.NODE_ENV = 'development';
    process.env.LOG_LEVEL = 'debug';

    const options = getLogOptions();
    expect(options.transport).toEqual({
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    });
    expect(options.level).toBe('debug');
  });

  it('should return no transport in production environments', () => {
    process.env.NODE_ENV = 'production';
    process.env.LOG_LEVEL = 'info';

    const options = getLogOptions();
    expect(options.transport).toBeUndefined();
    expect(options.level).toBe('info');
  });

  it('should return default log level if LOG_LEVEL is not set', () => {
    delete process.env.LOG_LEVEL;
    process.env.NODE_ENV = 'production';

    const options = getLogOptions();
    expect(options.level).toBe('info');
  });

});
