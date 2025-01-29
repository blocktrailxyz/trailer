# **Social login `OauthAuthenticator` Class**

The `OauthAuthenticator` class handles **OAuth-based authentication**by verifying user identities from external providers such as **Google, GitHub, and Telegram**. It ensures seamless user registration and login by linking authentication data to a user account.

---

## **How It Works**

1; **User Authentication via OAuth Provider**

- The user logs in via **Google, GitHub, or Telegram OAuth**and receives an **access token**.
- The access token is sent to our authentication service for verification.

2; **Validate OAuth Provider & Fetch User ID**

- The system determines the **provider type**(Google, GitHub, or Telegram).
- It sends an API request to the provider’s **OAuth user info endpoint**to retrieve the unique **provider ID**.

3; **Check for Existing User**

- If the **provider ID is already linked**to a user account, the existing user is **authenticated and returned**.
- If no account is found, a **new user account is created**and linked to the provider.

---

## **Registration & Authentication Flow**

### **1️⃣ Validate OAuth Provider & Token**

The method `getProviderId()` determines the provider and retrieves the unique user ID.

```typescript
const providerId = await this.getProviderId(provider, token);
if (!providerId) {
throw new Error("Failed to fetch provider ID");
}
```

### **2️⃣ Check if the User Exists**

If the provider ID is already registered, return the existing user.

```typescript
const existingAuth = await Authentication.findOne({ where: { provider, providerId } });

if (existingAuth) {
const user = await User.findByPk(existingAuth.userId);
if (!user) {
throw new Error("Associated user not found");
}
return { user, authentication: existingAuth, isNewUser: false };
}
```

### **3️⃣ Register a New User (If Not Found)**

If the user does not exist, create a **new account**and link it to the OAuth provider.

```typescript
const user = await User.create({ displayName, emojicon });
const authentication = await Authentication.create({ userId: user.id, provider, providerId });

return { user, authentication, isNewUser: true };
```

---

## **Supported OAuth Providers**

| **Provider**| **OAuth Endpoint**| **Fetched User ID**|
|-------------|------------------|----------------|
| **Google**| `https://www.googleapis.com/oauth2/v3/userinfo` | `response.data.sub` |
| **GitHub**| `https://api.github.com/user` | `response.data.id` |
| **Telegram**| `https://api.telegram.org/bot{token}/getMe` | `response.data.result.id` |

---

## **Security & Best Practices**

✅ **OAuth Tokens Must Be Validated**– Tokens are only used for a **single authentication request**.
✅ **No Passwords Stored**– Authentication is handled via OAuth, eliminating the need for password storage.
✅ **Token Expiry Handling**– Future enhancements should implement OAuth token refresh for session continuity.

By supporting **both blockchain authentication (`BlockchainAuthenticator`) and OAuth (`OauthAuthenticator`)**, our system ensures a **secure, flexible, and seamless**login experience for all users. 🚀

Would you like me to add **OAuth token refresh**support? 🔄
