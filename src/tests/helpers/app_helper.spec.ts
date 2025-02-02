import * as AppHelper from 'helpers/app_helper';
describe('AppHelper.isBlank', () => {
  it('should return true for undefined', () => {
    expect(AppHelper.isBlank(undefined)).toBe(true);
  });

  it('should return true for null', () => {
    expect(AppHelper.isBlank(null)).toBe(true);
  });

  it('should return true for false', () => {
    expect(AppHelper.isBlank(false)).toBe(true);
  });

  it('should return true for an empty string', () => {
    expect(AppHelper.isBlank('')).toBe(true);
  });

  it('should return true for a whitespace string', () => {
    expect(AppHelper.isBlank('   ')).toBe(true);
  });

  it('should return true for an empty array', () => {
    expect(AppHelper.isBlank([])).toBe(true);
  });

  it('should return true for an empty object', () => {
    expect(AppHelper.isBlank({})).toBe(true);
  });

  it('should return true for 0 (falsy number)', () => {
    expect(AppHelper.isBlank(0)).toBe(true);
  });

  it('should return false for a non-empty string', () => {
    expect(AppHelper.isBlank('hello')).toBe(false);
  });

  it('should return false for a non-empty array', () => {
    expect(AppHelper.isBlank([1, 2, 3])).toBe(false);
  });

  it('should return false for a non-empty object', () => {
    expect(AppHelper.isBlank({ key: 'value' })).toBe(false);
  });

  it('should return false for a truthy number', () => {
    expect(AppHelper.isBlank(42)).toBe(false);
  });

  it('should return false for true (truthy boolean)', () => {
    expect(AppHelper.isBlank(true)).toBe(false);
  });
});

describe('AppHelper.slugify', () => {
  it('should convert a string to lowercase', () => {
    expect(AppHelper.slugify('Hello')).toBe('hello');
  });

  it('should remove leading and trailing whitespace', () => {
    expect(AppHelper.slugify('  hello  ')).toBe('hello');
  });

  it('should replace spaces with dashes', () => {
    expect(AppHelper.slugify('hello world')).toBe('hello-world');
  });

  it('should replace non-alphanumeric characters with dashes', () => {
    expect(AppHelper.slugify('hello, world!')).toBe('hello-world');
  });

  it('should replace multiple non-alphanumeric characters with a single dash', () => {
    expect(AppHelper.slugify('hello,   world!')).toBe('hello-world');
  });

  it('should replace non-alphanumeric characters at the beginning and end of the string', () => {
    expect(AppHelper.slugify('!hello, world-1234')).toBe('hello-world-1234');
  });
})

