import Support from 'helpers/support_helper';

describe('Support.isBlank', () => {
  it('should return true for undefined', () => {
    expect(Support.isBlank(undefined)).toBe(true);
  });

  it('should return true for null', () => {
    expect(Support.isBlank(null)).toBe(true);
  });

  it('should return true for false', () => {
    expect(Support.isBlank(false)).toBe(true);
  });

  it('should return true for an empty string', () => {
    expect(Support.isBlank('')).toBe(true);
  });

  it('should return true for a whitespace string', () => {
    expect(Support.isBlank('   ')).toBe(true);
  });

  it('should return true for an empty array', () => {
    expect(Support.isBlank([])).toBe(true);
  });

  it('should return true for an empty object', () => {
    expect(Support.isBlank({})).toBe(true);
  });

  it('should return true for 0 (falsy number)', () => {
    expect(Support.isBlank(0)).toBe(true);
  });

  it('should return false for a non-empty string', () => {
    expect(Support.isBlank('hello')).toBe(false);
  });

  it('should return false for a non-empty array', () => {
    expect(Support.isBlank([1, 2, 3])).toBe(false);
  });

  it('should return false for a non-empty object', () => {
    expect(Support.isBlank({ key: 'value' })).toBe(false);
  });

  it('should return false for a truthy number', () => {
    expect(Support.isBlank(42)).toBe(false);
  });

  it('should return false for true (truthy boolean)', () => {
    expect(Support.isBlank(true)).toBe(false);
  });
});
