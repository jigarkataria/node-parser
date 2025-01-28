// src/utils/RangeExpander.ts
// Utility to expand cron field values such as wildcards, ranges, lists, and step values into explicit lists.
export function expandRange(value: string, [min, max]: [number, number]): string[] {
  if (value === '*') {
    return Array.from({ length: max - min + 1 }, (_, i) => (min + i).toString());
  }

  if (value.includes('/')) {
    const [base, step] = value.split('/').map(part => parseInt(part) || 0);
    if (step <= 0) {
      throw new Error(`Invalid step value in: ${value}`);
    }
    return Array.from({ length: Math.floor((max - min + 1) / step) }, (_, i) => (min + i * step).toString());
  }

  if (value.includes('-')) {
    const [start, end] = value.split('-').map(Number);
    return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
  }

  if (value.includes(',')) {
    return value.split(',');
  }

  if (!isNaN(Number(value))) {
    return [value];
  }

  throw new Error(`Invalid field value: ${value}`);
}