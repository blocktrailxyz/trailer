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
