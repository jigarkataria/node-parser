// src/utils/RangeExpander.ts

/**
 * Utility function to expand cron field values such as wildcards (*), ranges (e.g., 1-5),
 * lists (e.g., 1,2,3), and step values (e.g., */5) into explicit lists of values.
 *
 * @param {string} value - The cron field value to expand (e.g., *, 1-5, */5).
 * @param {[number, number]} [min, max] - The range limits for the cron field (e.g., [0, 59] for minutes).
 * @returns {string[]} An array of expanded values as strings.
 */
export function expandRange(value: string, [min, max]: [number, number]): string[] {
  // Handle wildcard (*) which represents the entire range
  if (value === '*') {
    return Array.from({ length: max - min + 1 }, (_, i) => (min + i).toString());
  }

  // Handle step values (e.g., */5)
  if (value.includes('/')) {
    // Split the value into base and step (e.g., */5 -> base: *, step: 5)
    const [base, step] = value.split('/').map(part => parseInt(part) || 0);

    // Validate the step value
    if (step <= 0) {
      throw new Error(`Invalid step value in: ${value}`);
    }

    // Generate the range based on the step value
    return Array.from(
      { length: Math.floor((max - min + 1) / step) },
      (_, i) => (min + i * step).toString()
    );
  }

  // Handle ranges (e.g., 1-5)
  if (value.includes('-')) {
    // Split the value into start and end (e.g., 1-5 -> start: 1, end: 5)
    const [start, end] = value.split('-').map(Number);

    // Generate the range from start to end
    return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
  }

  // Handle lists (e.g., 1,2,3)
  if (value.includes(',')) {
    // Split the list into individual values
    return value.split(',');
  }

  // Handle single numeric values (e.g., 5)
  if (!isNaN(Number(value))) {
    return [value];
  }

  // Throw an error for invalid values
  throw new Error(`Invalid field value: ${value}`);
}
