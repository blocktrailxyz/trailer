import pino from 'pino';

const getLogOptions = () => {
  const nonProduction = {
    target: 'pino-pretty', // Makes logs human-readable during development
    options: {
      colorize: true, // Adds colors to the logs
      translateTime: 'SYS:standard', // Formats timestamps
      ignore: 'pid,hostname', // Removes pid and hostname from logs
    },
  };

  const transport = process.env.APP_ENV !== 'production' ? nonProduction : undefined;

  console.log(`transport: ${JSON.stringify(transport)}`);

  return {
    transport: transport,
    level: process.env.LOG_LEVEL || 'info', // Default log level
  };
};

const Logger = pino;
const logger = pino(getLogOptions());

export { getLogOptions, Logger, logger };
