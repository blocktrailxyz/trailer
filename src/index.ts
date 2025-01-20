import app from './app';

const start = async () => {
  try {
    const port = parseInt(process.env.APP_PORT || '3000', 10);
    await app.listen({ port, host: '0.0.0.0' });
    app.log.info(`Server running at http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
