/* eslint-disable @typescript-eslint/no-explicit-any */
import { paginate, PaginationParams, parsePagination } from 'utils/paginate';
import { Serializer } from 'jsonapi-serializer';
import { ModelStatic, FindOptions } from 'sequelize';
import { FastifyRequest } from 'fastify';

// Mock the Sequelize Model and its methods
class MockModel {
  static count = jest.fn();
  static findAll = jest.fn();
}

const mockSerializer = new Serializer('mock', {
  attributes: ['name', 'email'],
});

const mockRequest = {
  protocol: 'http',
  hostname: 'localhost',
  url: '/users',
} as unknown as FastifyRequest;

describe('paginate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return paginated data with meta and links', async () => {
    // Mock data and behavior
    const mockData = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];

    MockModel.count.mockResolvedValue(50); // Total 50 records
    MockModel.findAll.mockResolvedValue(mockData); // Mock paginated data

    // Call the function
    const result = await paginate(
      MockModel as unknown as ModelStatic<any>, // Cast the mocked model
      { where: { active: true } } as FindOptions, // Mock FindOptions
      mockSerializer,
      2, // Page number
      10, // Page size
      mockRequest
    );

    // Assertions
    expect(MockModel.count).toHaveBeenCalledWith({ where: { active: true }, distinct: true });
    expect(MockModel.findAll).toHaveBeenCalledWith({
      where: { active: true },
      limit: 10,
      offset: 10,
    });

    expect(result).toEqual({
      meta: {
        totalRecords: 50,
        totalPages: 5,
        currentPage: 2,
        pageSize: 10,
      },
      links: {
        self: 'http://localhost/users?page=2&pageSize=10',
        next: 'http://localhost/users?page=3&pageSize=10',
        prev: 'http://localhost/users?page=1&pageSize=10',
      },
      data: {
        data: [
          {
            type: 'mocks',
            id: '1', // Mocked data doesn't have an id in this case
            attributes: { name: 'John Doe', email: 'john@example.com' },
          },
          {
            type: 'mocks',
            id: '2',
            attributes: { name: 'Jane Doe', email: 'jane@example.com' },
          },
        ],
      },
    });
  });

  it('should handle no data and return correct meta and links', async () => {
    MockModel.count.mockResolvedValue(0); // Total 0 records
    MockModel.findAll.mockResolvedValue([]); // No data

    const result = await paginate(
      MockModel as unknown as ModelStatic<any>,
      {},
      mockSerializer,
      1,
      10,
      mockRequest
    );

    expect(result).toEqual({
      meta: {
        totalRecords: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
      },
      links: {
        self: 'http://localhost/users?page=1&pageSize=10',
        next: null,
        prev: null,
      },
      data: { data: [] },
    });
  });

  it('should handle invalid page number gracefully', async () => {
    MockModel.count.mockResolvedValue(10); // Total 10 records
    MockModel.findAll.mockResolvedValue([]); // No data for invalid page

    const result = await paginate(
      MockModel as unknown as ModelStatic<any>,
      {},
      mockSerializer,
      -1, // Invalid page
      10,
      mockRequest
    );

    expect(result.meta.currentPage).toBe(-1);
    expect(result.meta.totalPages).toBe(1); // Only one page available
  });
});


describe('PaginationParams', () => {
  it('should parse valid query parameters', () => {
    const query = { page: '2', perPage: '15' };

    const result: PaginationParams = parsePagination(query);

    expect(result).toEqual({ page: 2, perPage: 15 });
    expect(result.page).toBe(2);
    expect(result.perPage).toBe(15);
  });

  it('should default to page 1 and perPage 10 if query parameters are missing', () => {
    const query = {};

    const result: PaginationParams = parsePagination(query);

    expect(result).toEqual({ page: 1, perPage: 10 });
  });

  it('should default to page 1 and perPage 10 if query parameters are invalid', () => {
    const query = { page: 'invalid', perPage: 'invalid' };

    const result: PaginationParams = parsePagination(query);

    expect(result).toEqual({ page: 1, perPage: 10 });
  });

  it('should handle partially missing query parameters', () => {
    const query = { page: '3' };

    const result: PaginationParams = parsePagination(query);

    expect(result).toEqual({ page: 3, perPage: 10 });
  });

  it('should handle extra fields in the query object gracefully', () => {
    const query = { page: '4', perPage: '20', extraField: 'value' };
    const { page, perPage } = parsePagination(query);

    expect(page).toEqual(4)
    expect(perPage).toEqual(20)
  });
});