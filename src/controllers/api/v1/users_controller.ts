import { FastifyReply, FastifyRequest } from 'fastify';
import User from 'models/user';
import { IUserSerializer, UserSerializer } from 'serializers/user_serializer';
import { JsonApiResponseType } from 'types/json_api_response_type';
import { paginate, parsePagination } from 'helpers/paginate_helper';
import { AppError } from 'errors/app_error';

export const index = async (request: FastifyRequest, reply: FastifyReply) => {
  const paginateParams = parsePagination(request.query);
  const paginatedUsers = await paginate(
    User,
    { order: [['createdAt', 'DESC']] },
    UserSerializer,
    paginateParams.page,
    paginateParams.perPage,
    request
  );

  reply.send(paginatedUsers);
};

export const show = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = request.params;
  const user = await User.findByPk(id);
  if (user) {
    const responseData = UserSerializer.serialize(user);
    reply.send(responseData);
  } else {
    throw new AppError('User not found', 404);
  }
};

export const create = async (request: FastifyRequest<{ Body: { displayName: string; emojicon: string } }>, reply: FastifyReply) => {
  const { displayName, emojicon } = request.body;
  try {
    const user = await User.create({ displayName, emojicon });
    const responseData: JsonApiResponseType<IUserSerializer> = UserSerializer.serialize(user);

    reply.status(201).send(responseData);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    throw new AppError(error.message, 400);
  }
};

export const update = async (request: FastifyRequest<{ Params: { id: string }; Body: { displayName?: string; emojicon?: string } }>, reply: FastifyReply) => {
  const { id } = request.params;
  const { displayName, emojicon } = request.body;

  const user = await User.findByPk(id);
  if (user) {
    const updatedUser = await user.update({ displayName, emojicon }) as User;
    const resonseData = UserSerializer.serialize(updatedUser);
    reply.send(resonseData);
  } else {
    throw new AppError('User not found', 404);
  }
};

export const destroy = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = request.params;

  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    reply.status(204).send();
  } else {
    throw new AppError('User not found', 404);
  }
};
