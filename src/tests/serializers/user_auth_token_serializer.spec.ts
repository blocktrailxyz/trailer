import { userFactory } from "factories/user.factory";
import UserAuthTokenSigner from "libs/user_auth_token_signer";
import User from "models/user";
import UserAuthTokenSerializer from "serializers/user_auth_token_serializer";


describe("UserAuthTokenSerializer", () => {

  test("should serialize user data into JSON:API format with JWT token", async () => {
    const user = await userFactory.create({
      displayName: "John Doe",
      authTokenVersion: 1,
    }, User) as User;

    const serializedUser = UserAuthTokenSerializer.serialize(user);

    expect(serializedUser).toHaveProperty("data");
    expect(serializedUser.data).toHaveProperty("type", "users");
    expect(serializedUser.data).toHaveProperty("id", user.id);
    expect(serializedUser.data.attributes).toHaveProperty("displayName", user.displayName);
    expect(serializedUser.data.meta).toHaveProperty("accessToken", user.jwtToken());

    // Verify the token is valid
    const verifiedUser = await UserAuthTokenSigner.verify(serializedUser.data.meta.accessToken);
    expect(verifiedUser).not.toBeNull();
    expect(verifiedUser?.id).toBe(user.id);
    expect(verifiedUser?.displayName).toBe(user.displayName);
  });
});
