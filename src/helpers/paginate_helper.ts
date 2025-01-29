import { FastifyRequest } from 'fastify';
import { Model, FindOptions, ModelStatic } from 'sequelize';
import { Serializer } from 'jsonapi-serializer';
import { Env } from 'libs/env';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PaginateResult<T> {
  meta: {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  links: {
    self: string;
    next: string | null;
    prev: string | null;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export async function paginate<T extends Model>(
  model: ModelStatic<T>, // Corrected type for the model parameter
  options: FindOptions<T['_attributes']>, // Ensures query options are strongly typed
  serializer: Serializer,
  page: number = 1,
  pageSize: number = 10,
  request: FastifyRequest
): Promise<PaginateResult<T>> {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  // Fetch total records count and paginated rows
  const totalRecords = await model.count({ ...options, distinct: true });
  const rows: T[] = await model.findAll({ ...options, limit, offset });

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);

  // Helper to construct dynamic links
  const constructLink = (pageNum: number): string => {
    // const url = new URL(`${request.protocol}://${request.hostname}${request.url}`);
    const url = new URL(`${Env.fetch('APP_HOST', 'http://localhost')}${request.url}`);
    url.searchParams.set('page', pageNum.toString());
    url.searchParams.set('pageSize', pageSize.toString());
    return url.toString();
  };

  return {
    meta: {
      totalRecords,
      totalPages,
      currentPage: page,
      pageSize,
    },
    links: {
      self: constructLink(page),
      next: page < totalPages ? constructLink(page + 1) : null,
      prev: page > 1 ? constructLink(page - 1) : null,
    },
    data: serializer.serialize(rows),
  };
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePagination(query: any): PaginationParams {
  const page = parseInt(query.page as string, 10) || 1; // Default to page 1
  const perPage = parseInt(query.perPage as string, 10) || 10; // Default to 10 items per page

  return { page, perPage };
}