import { FastifyRequest, FastifyReply } from 'fastify';
import User from 'models/user';
import * as Controller from 'controllers/api/v1/users';
import { UserSerializer } from 'serializers/user';
import { paginate, parsePagination } from 'utils/paginate';

jest.mock('models/user');
jest.mock('utils/paginate');

describe('UsersController', () => {
  let mockReply: FastifyReply;

  beforeEach(() => {
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    jest.clearAllMocks();
  });

  describe('users#index', () => {
    it('should fetch paginated users and send response', async () => {
      const mockRequest = {
        query: { page: '1', perPage: '10' },
        log: { error: jest.fn() },
      } as unknown as FastifyRequest;

      // jest mocks once mock all
      (paginate as jest.Mock).mockResolvedValue({ data: [], meta: {}, links: {} });
      (parsePagination as jest.Mock).mockReturnValue({ page: 1, perPage: 10 });

      await Controller.index(mockRequest, mockReply);

      expect(paginate).toHaveBeenCalledWith(
        User,
        { order: [['createdAt', 'DESC']] },
        UserSerializer,
        1,
        10,
        mockRequest
      );
      expect(mockReply.send).toHaveBeenCalledWith({ data: [], meta: {}, links: {} });
    });

    it('should handle errors and return JSON:API error response', async () => {
      const mockRequest = {
        query: { page: '1', perPage: '10' },
        log: { error: jest.fn(exceptionObject => {
          return exceptionObject;
        }) },
      } as unknown as FastifyRequest;

      // jest mocks once mock all
      (parsePagination as jest.Mock).mockReturnValue({ page: 1, perPage: 10 });
      (paginate as jest.Mock).mockRejectedValue(new Error('Database error'));

      await Controller.index(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        errors: [
          {
            status: '500',
            title: 'Internal Server Error',
            detail: 'Database error',
          },
        ],
      });
    });
  });

  describe('show', () => {
    it('should fetch a user by ID and send response', async () => {
      const mockRequest = {
        params: { id: '1' },
      } as unknown as FastifyRequest<{ Params: { id: string } }>;

      const mockUser = { id: 1, displayName: 'John Doe', emojicon: ':-)' };
      (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

      await Controller.show(mockRequest, mockReply);

      expect(User.findByPk).toHaveBeenCalledWith('1');
      expect(mockReply.send).toHaveBeenCalledWith(UserSerializer.serialize(mockUser));
    });

    it('should return 404 if user is not found', async () => {
      const mockRequest = {
        params: { id: '1' },
      } as unknown as FastifyRequest<{ Params: { id: string } }>;

      (User.findByPk as jest.Mock).mockResolvedValue(null);

      await Controller.show(mockRequest, mockReply);

      expect(User.findByPk).toHaveBeenCalledWith('1');
      expect(mockReply.status).toHaveBeenCalledWith(404);

      expect(mockReply.send).toHaveBeenCalledWith({
        errors: [
          {
            status: '404',
            title: 'Not Found',
            detail: 'Resource is not found',
          },
        ],
      });
    });
  });

  describe('create', () => {
    it('should create a user and send a response', async () => {
      const mockRequest = {
        body: { displayName: 'John Doe', emojicon: ':-)' },
      } as unknown as FastifyRequest<{ Body: { displayName: string; emojicon: string } }>;

      const mockUser = { id: 1, displayName: 'John Doe', emojicon: ':-)' };
      (User.create as jest.Mock).mockResolvedValue(mockUser);

      await Controller.create(mockRequest, mockReply);

      expect(User.create).toHaveBeenCalledWith({ displayName: 'John Doe', emojicon: ':-)' });
      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(UserSerializer.serialize(mockUser));
    });

    it('should handle errors and return JSON:API error response', async () => {
      const mockRequest = {
        body: { displayName: 'John Doe', emojicon: ':-)' },
      } as unknown as FastifyRequest<{ Body: { displayName: string; emojicon: string } }>;

      (User.create as jest.Mock).mockRejectedValue(new Error('Validation error'));

      await Controller.create(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        errors: [
          {
            status: '500',
            title: 'Internal Server Error',
            detail: 'Validation error',
          },
        ],
      });
    });
  });
});
