# Blockchain-Based Registration

## **Overview**

Blockchain-based registration enables users to create and authenticate accounts using cryptographic signatures instead of traditional credentials like usernames and passwords. This method enhances security, eliminates centralized authentication risks, and allows seamless interaction with decentralized applications (dApps).

The registration process leverages two key components:

- **`BaseKeypairSigner`**: Handles signing and verification of blockchain messages.  
- **`BlockchainAuthenticator`**: Manages authentication logic, user creation, and verification of signatures.  

---

## **Registration Process**

### **1. User Signs Up with a Blockchain Wallet**

- A user initiates the registration process by providing their **wallet address** (Ethereum, Base, Solana, or Sui).  
- The system generates a **unique authentication message** for the user to sign, ensuring security against replay attacks.  

```typescript
const walletAddress = "0x1234567890abcdef";
const message = `Registering my account at ${Date.now()}`;
const signature = await BaseKeypairSigner.sign(walletPrivateKey, message);
```

---

#### **2. Message Verification with `BlockchainAuthenticator`**

- The signed message and wallet address are sent to the backend.
- `BlockchainAuthenticator` verifies the **signature** using the appropriate keypair signer (`BaseKeypairSigner`, `SolanaKeypairSigner`, or `SuiKeypairSigner`).  
- If the **signature is valid**, the authentication is processed.

```typescript
const isVerified = await BlockchainAuthenticator.verify({
  walletAddress,
  signature,
  token, // JWT token for additional security
});

if (!isVerified) {
  throw new Error("Invalid signature. Registration failed.");
}
```

---

## **3. User Account Creation or Retrieval**

Once the wallet is verified:

- The system checks if the **wallet is already linked** to an existing account.
- If the wallet is new, a **new user account** is created.
- The wallet address is stored as the **authentication method** for future logins.

```typescript
const authResult = await BlockchainAuthenticator.call({
  walletAddress,
  signature,
  token,
});

console.log("User Registered:", authResult.user);
console.log("New User:", authResult.isNewUser);
```

---

## **Login Process with Blockchain Authentication**

1. The user initiates a **login request**.
2. The system generates a **one-time login challenge**.
3. The user signs the challenge using their **private key**.
4. `BlockchainAuthenticator` verifies the signed message.
5. If verified, the user is **authenticated without passwords**.

```typescript
const loginMessage = `Login request at ${Date.now()}`;
const loginSignature = await BaseKeypairSigner.sign(walletPrivateKey, loginMessage);

const isLoginVerified = await BlockchainAuthenticator.verify({
  walletAddress,
  signature: loginSignature,
  token,
});

if (isLoginVerified) {
  console.log("User successfully logged in!");
}
```

---

## **Security Enhancements**

✅ **Decentralized & Trustless** – Eliminates password-based authentication.
✅ **Prevents Replay Attacks** – Uses unique authentication messages with timestamps.
✅ **Multi-Chain Support** – Works with Ethereum, Base, Solana, and Sui.
✅ **Seamless dApp Integration** – Users authenticate using their wallets.
