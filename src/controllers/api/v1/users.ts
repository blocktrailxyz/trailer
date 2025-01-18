import { FastifyReply, FastifyRequest } from 'fastify';
import User from 'models/user';

export const index = async (_request: FastifyRequest, reply: FastifyReply) => {
  const users = await User.findAll();
  reply.send(users);
};

export const show = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const user = await User.findByPk(request.params.id);
  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({ error: 'User not found' });
  }
};

export const create = async (request: FastifyRequest<{ Body: { name: string; email: string } }>, reply: FastifyReply) => {
  const { name, email } = request.body;
  const user = await User.create({ name, email });
  reply.status(201).send(user);
};

export const update = async (request: FastifyRequest<{ Params: { id: string }; Body: { name?: string; email?: string } }>, reply: FastifyReply) => {
  const { id } = request.params;
  const { name, email } = request.body;

  const user = await User.findByPk(id);
  if (user) {
    await user.update({ name, email });
    reply.send(user);
  } else {
    reply.status(404).send({ error: 'User not found' });
  }
};

export const destroy = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = request.params;

  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    reply.status(204).send();
  } else {
    reply.status(404).send({ error: 'User not found' });
  }
};
