
// Parses a cron string into its components and expands them into schedules
import { expandRange } from './utils/RangeExpander';

type CronField = 'minute' | 'hour' | 'day of month' | 'month' | 'day of week';

const CRON_LIMITS: Record<CronField, [number, number]> = {
  minute: [0, 59],
  hour: [0, 23],
  'day of month': [1, 31],
  month: [1, 12],
  'day of week': [0, 6],
};

export class CronParser {
  private fields: string[];
  private command: string;

  constructor(private cronString: string) {
    const parts = cronString.split(' ');
    if (parts.length < 6) {
      throw new Error('Invalid cron string format');
    }

    this.fields = parts.slice(0, 5);
    this.command = parts.slice(5).join(' ');
  }

  parse() {
    const result: Record<string, string[]> = {};

    Object.keys(CRON_LIMITS).forEach((field, index) => {
      result[field] = expandRange(this.fields[index], CRON_LIMITS[field as CronField]);
    });

    result['command'] = [this.command];
    return result;
  }
}
