// src/specs/UserAuthTokenSigner.spec.ts
import User from "models/user";
import UserAuthTokenSigner from "libs/user_auth_token_signer";
import { userFactory } from "factories/user.factory";

describe("UserAuthTokenSigner", () => {
  test("should sign a valid JWT token", async () => {
    const user = await userFactory.create({
      displayName: "John Doe",
      authTokenVersion: 1,
    }, User) as User;

    const token = UserAuthTokenSigner.sign(user, 3600);
    expect(typeof token).toBe("string");
  });

  test("should verify a valid JWT token", async () => {
    const user = await userFactory.create({
      displayName: "John Doe",
      authTokenVersion: 1,
    }, User) as User;

    const token = UserAuthTokenSigner.sign(user, 3600);

    expect(typeof token).toBe("string");

    const decodeUser = await UserAuthTokenSigner.verify(token) as User;
    expect(decodeUser.id).toBe(user.id);
    expect(decodeUser.displayName).toBe(user.displayName);
    expect(decodeUser.authTokenVersion).toBe(user.authTokenVersion);
  });

  test("should return null for invalid user ID", async () => {
    const user = await userFactory.create({
      displayName: "John Doe",
      authTokenVersion: 1,
    }, User) as User;

    const token = UserAuthTokenSigner.sign(user, 3600);
    await user.destroy(); // Simulate user deletion

    const verifiedUser = await UserAuthTokenSigner.verify(token);
    expect(verifiedUser).toBeNull();
  });

  test("should return null for mismatched authTokenVersion", async () => {
    const user = await userFactory.create({
      displayName: "John Doe",
      authTokenVersion: 1,
    }, User) as User;

    const token = UserAuthTokenSigner.sign(user, 3600);

    await user.update({ authTokenVersion: 2 }); // Simulate token revocation

    const verifiedUser = await UserAuthTokenSigner.verify(token);
    expect(verifiedUser).toBeNull();
  });

  test("should return null for an expired token", async () => {
    const user = await userFactory.create({
      displayName: "John Doe",
      authTokenVersion: 1,
    }, User) as User;

    const token = UserAuthTokenSigner.sign(user, -1); // Expired token

    const verifiedUser = await UserAuthTokenSigner.verify(token)
    expect(verifiedUser).toBeNull();
  })
});
