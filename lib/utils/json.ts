import { Prisma } from '@prisma/client';

/**
 * Safe JSON parsing utility
 * Handles empty strings, null values, and invalid JSON gracefully
 */
export function safeJsonParse<T = any>(
  value: string | null | undefined | object | Prisma.JsonValue,
  fallback: T | null = null
): T | null {
  if (value === null || value === undefined) {
    return fallback;
  }

  // If already an object, return as-is
  if (typeof value === 'object' && !Array.isArray(value)) {
    return value as T;
  }

  // If it's an array, return as-is
  if (Array.isArray(value)) {
    return value as T;
  }

  // If it's a string, try to parse
  if (typeof value === 'string') {
    const trimmed = value.trim();
    
    // Empty string or whitespace-only
    if (!trimmed || trimmed === 'null' || trimmed === 'undefined') {
      return fallback;
    }

    try {
      return JSON.parse(trimmed) as T;
    } catch (error) {
      console.warn('Failed to parse JSON:', error, 'Value:', trimmed.substring(0, 50));
      return fallback;
    }
  }

  return fallback;
}

/**
 * Safe JSON stringify utility
 */
export function safeJsonStringify(value: any, fallback: string = '{}'): string {
  try {
    if (value === null || value === undefined) {
      return fallback;
    }
    return JSON.stringify(value);
  } catch (error) {
    console.warn('Failed to stringify JSON:', error);
    return fallback;
  }
}
