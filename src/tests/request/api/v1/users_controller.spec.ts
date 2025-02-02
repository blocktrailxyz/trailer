/* eslint-disable @typescript-eslint/no-unused-vars */
import User from 'models/user';
import fastify from 'fastify';
import routes from 'routes/index_route';
import { userFactory } from 'factories/user.factory';
import { faker } from '@faker-js/faker/.';
describe('UsersController', () => {
  const app = fastify();

  beforeAll(async() => {
    app.register(routes)
    await app.ready()
  });

  afterAll(async () => {
    await app.close();
  });

  describe('users#index', () => {
    it('should fetch paginated users and send response', async () => {
      const user1 = await userFactory.create({}, User) as User;
      const user2 = await userFactory.create({}, User) as User;
      const user3 = await userFactory.create({}, User) as User;

      const query = { page: '1', perPage: '1' }
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/users',
        query: query,
      });
      const responseJson = JSON.parse(response.body);

      expect(response.statusCode).toBe(200);
      expect(responseJson.meta).toEqual({totalRecords: 3, totalPages: 3, currentPage: 1, pageSize: 1 })
      expect(responseJson.data.length).toBe(1);
      expect(responseJson.data[0].type).toBe('users');
      expect(responseJson.data[0].id).toBeDefined()
      expect(responseJson.data[0].attributes).toBeDefined()

      expect(responseJson.links.next).toBeDefined();
      expect(responseJson.links.self).toBeDefined();
      expect(responseJson.links.prev).toBeNull();
    });

    it('should handle errors and return JSON:API error response', async () => {
      await User.destroy({ where: {} });

      const query = { page: '1', perPage: '1' }
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/users',
        query: query,
      });
      const responseJson = JSON.parse(response.body);

      expect(response.statusCode).toBe(200);
      expect(responseJson.meta).toEqual({ totalRecords: 0, totalPages: 0, currentPage: 1, pageSize: 1 })
      expect(responseJson.data.length).toBe(0);
      expect(responseJson.links.next).toBeNull();
      expect(responseJson.links.self).toBeDefined();
      expect(responseJson.links.prev).toBeNull();
    });
  });
  describe('show', () => {
    it('should fetch a user by ID and send response', async () => {
      const user = await userFactory.create({}, User) as User;

      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/users/${user.id}`,
      })
      const responseJson = JSON.parse(response.body)
      expect(response.statusCode).toBe(200);

      expect(responseJson).toHaveProperty('data');
      expect(responseJson.data.type).toBe('users');
      expect(responseJson.data.id).toBe(user.id);
    });

    it('should return 404 if user is not found', async () => {
      // 065e4354-15d5-49dd-a8aa-5444f51e946d
      const userId = faker.string.uuid();
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/users/${userId}`,
      })
      const responseJson = JSON.parse(response.body)
      const expectedResponse = {
        errors: [ { status: '404', title: 'Not Found', detail: 'User not found' } ]
      }

      expect(response.statusCode).toBe(404);
      expect(responseJson).toEqual(expectedResponse);
    });
  });

  describe('create', () => {
    it('should create a user and send a response', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload: { displayName: 'John Doe', emojicon: ':-)' },
      })

      const user = await User.findOne({ where: { displayName: 'John Doe' } }) as User;
      const responseJson = JSON.parse(response.body);

      expect(response.statusCode).toBe(201);
      expect(responseJson).toHaveProperty('data');
      expect(responseJson.data.type).toBe('users');
      expect(responseJson.data.id).toBe(user.id);
    });

    it('should handle errors and return JSON:API error response', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload: { emojicon: ':-)' },
      })

      const responseJson = JSON.parse(response.body);
      const expectedResponse = {
        errors: [
          {
            status: '400',
            title: 'Bad Request',
            detail: 'notNull Violation: User.displayName cannot be null'
          }
        ]
      }
      expect(response.statusCode).toBe(400);
      expect(responseJson).toEqual(expectedResponse);
    });
  });

  describe('update', () => {
    it('should update a user and send a response', async () => {
      const user = await userFactory.create({displayName: 'Jhone', emojicon: ':-(' }, User) as User;
      const response = await app.inject({
        method: 'PUT',
        url: `/api/v1/users/${user.id}`,
        payload: { displayName: 'Jane Doe', emojicon: ':-)' },
      })

      const responseJson = JSON.parse(response.body);

      expect(response.statusCode).toBe(200);
      expect(responseJson).toHaveProperty('data');
      expect(responseJson.data.type).toBe('users');
      expect(responseJson.data.id).toBe(user.id);
      expect(responseJson.data.attributes.displayName).toBe('Jane Doe');
      expect(responseJson.data.attributes.emojicon).toBe(':-)');
    })

    it('should handler error', async () => {
      const userId = faker.string.uuid();
      const response = await app.inject({
        method: 'PUT',
        url: `/api/v1/users/${userId}`,
        payload: { displayName: 'Jane Doe', emojicon: ':-)' },
      })

      const responseJson = JSON.parse(response.body);
      const expectedResponse = {
        errors: [ { status: '404', title: 'Not Found', detail: 'User not found' } ]
      }
      expect(response.statusCode).toBe(404);
      expect(responseJson).toEqual(expectedResponse);
    })
  })

  describe('destroy', () => {
    it('should delete a user and send a response', async () => {
      const user = await userFactory.create({}, User) as User;
      const response = await app.inject({
        method: 'DELETE',
        url: `/api/v1/users/${user.id}`,
      })

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual('');
    })

    it('should handle error', async () => {
      const userId = faker.string.uuid();
      const response = await app.inject({
        method: 'DELETE',
        url: `/api/v1/users/${userId}`,
      })

      const responseJson = JSON.parse(response.body);
      const expectedResponse = {
        errors: [ { status: '404', title: 'Not Found', detail: 'User not found' } ]
      }
      expect(response.statusCode).toBe(404);
      expect(responseJson).toEqual(expectedResponse);
    })
  })
});
