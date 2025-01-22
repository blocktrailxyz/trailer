import './env_loader'

export class EnvNotFoundError extends Error {
  constructor(key: string, customMessage?: string) {
    const errorMessage = customMessage || `Environment variable not found: ${key}`;
    super(errorMessage);
    this.name = 'EnvNotFoundError';
  }
}

export class Env {
  env: Record<string, string | undefined>;

  constructor(env: NodeJS.ProcessEnv) {
    this.env = env;
  }

  public static fetch(key: string, defaultValue?: string): string{
    const value = process.env[key];

    if (value !== undefined)
      return value;

    if (defaultValue !== undefined) {
      return defaultValue;
    }

    throw new EnvNotFoundError(key);
  }

  // Access environment variables using [] operator
  public get(key: string): string | undefined {
    return this.env[key];
  }

  public fetch(key: string, defaultValue?: string): string {
    const value = this.get(key);

    if (value !== undefined)
      return value;

    if (defaultValue !== undefined) {
      return defaultValue;
    }

    throw new EnvNotFoundError(key);
  }

  // Enable [] operator access
  public get [Symbol.toStringTag](): string {
    return 'Env';
  }
}