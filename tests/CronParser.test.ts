
// Unit tests for CronParser
import { CronParser } from '../src/CronParser';

describe('CronParser', () => {
  it('parses a valid cron string', () => {
    const parser = new CronParser('*/15 0 1,15 * 1-5 /usr/bin/find');
    const result = parser.parse();
    expect(result['minute']).toEqual(['0', '15', '30', '45']);
    expect(result['hour']).toEqual(['0']);
    expect(result['day of month']).toEqual(['1', '15']);
    expect(result['month']).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
    expect(result['day of week']).toEqual(['1', '2', '3', '4', '5']);
    expect(result['command']).toEqual(['/usr/bin/find']);
  });

  it('throws an error for an invalid cron string', () => {
    expect(() => new CronParser('invalid string')).toThrow('Invalid cron string format');
  });
});
