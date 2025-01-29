import { userFactory } from 'factories/user.factory';
import { UserSerializer } from 'serializers/user_serializer';
import User from 'models/user'
// import { JsonApiResponseType } from 'types/json_api_response';

describe('UserSerializer', () => {
  it('serializes a single user', async() => {
    const user = await userFactory.create({}, User)
    const serialized= UserSerializer.serialize(user);

    expect(serialized).toEqual({
      data: {
        type: 'users',
        id: `${user.id}`,
        attributes: {
          displayName: user.displayName,
          emojicon: user.emojicon,
        },
      },
    });
  });

  it('serializes multiple users into JSON:API format', () => {
    const users = [
      {
        id: 1,
        displayName: 'John Doe',
        emojicon: '😊',
      },
      {
        id: 2,
        displayName: 'Jane Smith',
        emojicon: '😎',
      },
    ];

    const serialized = UserSerializer.serialize(users);

    expect(serialized).toEqual({
      data: [
        {
          type: 'users',
          id: '1',
          attributes: {
            displayName: 'John Doe',
            emojicon: '😊',
          },
        },
        {
          type: 'users',
          id: '2',
          attributes: {
            displayName: 'Jane Smith',
            emojicon: '😎',
          },
        },
      ],
    });
  });
});
