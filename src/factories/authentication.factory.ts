import { Factory } from './factory'; // Adjust the path based on your Factory implementation
import { userFactory } from './user.factory'; // Import your existing user factory
import Authentication, { Provider } from '../models/authentication'; // Adjust to your Authentication model
import User from '../models/user'; // Adjust to your User model
import { faker } from '@faker-js/faker/.';

// Authentication Factory
export const authenticationFactory = new Factory<Partial<Authentication>>(() => ({
  provider: Provider.Google, // Default provider is Google
  providerId: faker.string.uuid(), // Generate a unique provider ID
  createdAt: new Date(),
  updatedAt: new Date(),
}));


// Valid User Factory
export const authenticationWithUserFactory = {
  async create(
    userOverrides?: Partial<User>,
    authOverrides?: Partial<Authentication>
  ): Promise<{ user: Partial<User>; authentication: Partial<Authentication> }> {
    // Create a User record
    const user = await userFactory.create(userOverrides, User);

    // Create an associated Authentication record
    const authentication = await authenticationFactory.create(
      { ...authOverrides, userId: user.id },
      Authentication
    );

    return { user, authentication };
  },

  build(
    userOverrides?: Partial<User>,
    authOverrides?: Partial<Authentication>
  ): { user: Partial<User>; authentication: Partial<Authentication> } {
    // Build a User object in memory
    const user = userFactory.build(userOverrides);

    // Build an associated Authentication object in memory
    const authentication = authenticationFactory.build({
      ...authOverrides,
      userId: user.id,
    });

    return { user, authentication };
  },
};

// const { user, authentication } = authenticationWithUserFactory.build(
//   { displayName: 'Alice Doe' },
//   { provider: Provider.GitHub, providerId: 'github-id-123' }
// );
