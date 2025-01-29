import { Env, EnvNotFoundError } from 'libs/env'; // Adjust the import path as necessary

describe('Env', () => {
  const mockEnv = {
    PORT: '3000',
    NODE_ENV: 'development'
  };

  const env = new Env(mockEnv);

  describe('#get', () => {

    it('should return the value of an existing environment variable', () => {
      expect(env.get('PORT')).toBe('3000');
    });

    it('should return undefined for a non-existent environment variable', () => {
      expect(env.get('NON_EXISTENT')).toBeUndefined();
    });
  });

  describe('#fetch', () => {
    it('should return the value of an existing environment variable', () => {
      expect(env.fetch('PORT')).toBe('3000');
    });

    it('should return the default value if the variable does not exist and a default is provided', () => {
      expect(env.fetch('NON_EXISTENT', '')).toBe('');
    });

    it('should throw an EnvNotFoundError if the variable does not exist and no default value is provided', () => {
      expect(() => env.fetch('NON_EXISTENT')).toThrow(EnvNotFoundError);
      expect(() => env.fetch('NON_EXISTENT')).toThrow('Environment variable not found: NON_EXISTENT');
    });

    describe('integration', () => {
      it('should work seamlessly with both get and fetch', () => {
        expect(env.get('NODE_ENV')).toBe('development');
        expect(env.fetch('NODE_ENV')).toBe('development');
        expect(env.fetch('MISSING_ENV', 'default')).toBe('default');
      });
    });

  });

  describe('Env.fetch', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      // Reset process.env to avoid side effects
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      // Restore the original process.env
      process.env = originalEnv;
    });

    it('should return the environment variable value if it exists', () => {
      process.env.TEST_KEY = 'test_value';
      const result = Env.fetch('TEST_KEY');
      expect(result).toBe('test_value');
    });

    it('should return the default value if the environment variable is not set', () => {
      const result = Env.fetch('NON_EXISTENT_KEY', 'default_value');
      expect(result).toBe('default_value');
    });

    it('should throw an EnvNotFoundError if the environment variable is not set and no default value is provided', () => {
      expect(() => Env.fetch('NON_EXISTENT_KEY')).toThrow(EnvNotFoundError);
    });

    it('should pass the key to the EnvNotFoundError when throwing', () => {
      try {
        Env.fetch('NON_EXISTENT_KEY');
      } catch (error) {
        expect(error).toBeInstanceOf(EnvNotFoundError);
      }
    });
  });

  describe('isProduction', () => {
    it('should return true when NODE_ENV is "production"', () => {
      process.env.NODE_ENV = 'production';
      expect(Env.isProduction()).toBe(true);
    });

    it('should return false when NODE_ENV is not "production"', () => {
      process.env.NODE_ENV = 'development';
      expect(Env.isProduction()).toBe(false);

      process.env.NODE_ENV = 'test';
      expect(Env.isProduction()).toBe(false);
    });
  });

  describe('isDevelopment', () => {
    it('should return true when NODE_ENV is "development"', () => {
      process.env.NODE_ENV = 'development';
      expect(Env.isDevelopment()).toBe(true);
    });

    it('should return false when NODE_ENV is not "development"', () => {
      process.env.NODE_ENV = 'production';
      expect(Env.isDevelopment()).toBe(false);

      process.env.NODE_ENV = 'test';
      expect(Env.isDevelopment()).toBe(false);
    });
  });

  describe('isTest', () => {
    it('should return true when NODE_ENV is "test"', () => {
      process.env.NODE_ENV = 'test';
      expect(Env.isTest()).toBe(true);
    });

    it('should return false when NODE_ENV is not "test"', () => {
      process.env.NODE_ENV = 'development';
      expect(Env.isTest()).toBe(false);

      process.env.NODE_ENV = 'production';
      expect(Env.isTest()).toBe(false);
    });
  });
});

describe('EnvNotFoundError', () => {
  it('should create an error with a custom message', () => {
    const error = new EnvNotFoundError('TEST_KEY');
    expect(error.message).toBe('Environment variable not found: TEST_KEY');
    expect(error.name).toBe('EnvNotFoundError');
  });

  it('should create an error with a custom message when provided', () => {
    const error = new EnvNotFoundError('TEST_KEY', 'Custom error message');
    expect(error.message).toBe('Custom error message');
    expect(error.name).toBe('EnvNotFoundError');
  });
});
