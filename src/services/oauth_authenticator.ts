import axios from 'axios';
import User from 'models/user';
import Authentication, {OauthProvider} from 'models/authentication';

export interface OAuthParams {
  provider: OauthProvider;
  token: string;
  displayName?: string;
  emojicon?: string;
}

export interface OAuthResult {
  user: User;
  authentication: Authentication;
  isNewUser: boolean;
}

class OauthAuthenticator {
  static async call(params: OAuthParams): Promise<OAuthResult> {
    const { provider, token, displayName, emojicon } = params;

    // Validate provider
    if (!Object.values(OauthProvider).includes(provider)) {
      throw new Error('Invalid provider');
    }

    // Fetch user details from the provider
    const providerId = await this.getProviderId(provider, token);
    if (!providerId) {
      throw new Error('Failed to fetch provider ID');
    }

    // Check if the user already exists
    const existingAuth = await Authentication.findOne({ where: { provider, providerId } });

    if (existingAuth) {
      const user = await User.findByPk(existingAuth.userId);
      if (!user) {
        throw new Error('Associated user not found');
      }
      return { user, authentication: existingAuth, isNewUser: false };
    }

    // Create a new user and link the provider
    const user = await User.create({ displayName, emojicon });
    const authentication = await Authentication.create({ userId: user.id, provider, providerId });

    return { user, authentication, isNewUser: true };
  }

  private static async getProviderId(provider: string, token: string): Promise<string | null> {
    switch (provider) {
      case OauthProvider.Google:
        return this.fetchGoogleUserId(token);
      case OauthProvider.GitHub:
        return this.fetchGitHubUserId(token);
      case OauthProvider.Telegram:
        return this.fetchTelegramUserId(token);
      default:
        return null;
    }
  }

  private static async fetchGoogleUserId(token: string): Promise<string | null> {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.sub; // Google user ID
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch(error) {
      throw new Error('Failed to fetch provider ID');
    }
  }

  private static async fetchGitHubUserId(token: string): Promise<string | null> {

    const response = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.id.toString(); // GitHub user ID

  }

  private static async fetchTelegramUserId(token: string): Promise<string | null> {
    const response = await axios.get(`https://api.telegram.org/bot${token}/getMe`);
    return response.data.result.id.toString(); // Telegram bot user ID
  }
}

export default OauthAuthenticator;
