// utils/support.ts
export default class Support {
  /**
   * Checks if a value is empty, falsy, or undefined.
   * @param value - The value to check.
   * @returns `true` if the value is empty, falsy, or undefined, otherwise `false`.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isBlank(value: any): boolean {
    return (
      value === undefined || // Undefined
      value === null || // Null
      value === false || // Falsy boolean
      value === 0 ||
      (typeof value === 'string' && value.trim().length === 0) || // Empty string
      (Array.isArray(value) && value.length === 0) || // Empty array
      (typeof value === 'object' && value !== null && Object.keys(value).length === 0) // Empty object
    );
  }
}

export const isBlank = Support.isBlank
