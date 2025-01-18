import fastify from 'fastify'
import { Env } from 'libs/env';
const server = fastify()


const env = new Env(process.env);
const port = parseInt(env.fetch('APP_PORT', '8080'));

server.get('/ping', async (request, reply) => {
  return 'pong\n'
});

server.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})