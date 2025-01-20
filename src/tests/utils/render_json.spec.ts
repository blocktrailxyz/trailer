
import { FastifyRequest, FastifyReply } from 'fastify';
import { renderJson } from 'utils/render_json';

describe('renderJson', () => {
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    mockRequest = {
      log: { error: jest.fn() },
    } as unknown as FastifyRequest;

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  it('should execute the action and return the result', async () => {
    const mockAction = jest.fn().mockResolvedValue('Success');

    const result = await renderJson(mockAction, mockRequest, mockReply);

    expect(mockAction).toHaveBeenCalled();
    expect(result).toBe('Success');
    expect(mockReply.status).not.toHaveBeenCalled();
    expect(mockReply.send).not.toHaveBeenCalled();
  });

  it('should handle errors and send a JSON:API error response', async () => {
    const mockError = new Error('Something went wrong');
    const mockAction = jest.fn().mockRejectedValue(mockError);

    await renderJson(mockAction, mockRequest, mockReply);

    expect(mockAction).toHaveBeenCalled();
    // expect(mockRequest.log.error).toHaveBeenCalledWith(mockError);
    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      errors: [
        {
          status: '500',
          title: 'Internal Server Error',
          detail: 'Something went wrong',
        },
      ],
    });
  });
});
