// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBlank(value: any): boolean {
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

export function slugify(text: string): string {
  return text.toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
            .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
}

