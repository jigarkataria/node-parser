// Unit tests for CronParser

// Importing the CronParser class to be tested
import { CronParser } from '../src/CronParser';

// Grouping the test cases for CronParser using Jest's describe block
describe('CronParser', () => {
  /**
   * Test Case: Valid cron string parsing
   * This test verifies if the CronParser correctly parses a valid cron string into its components.
   */
  it('parses a valid cron string', () => {
    // Arrange: Create a CronParser instance with a valid cron string
    const parser = new CronParser('*/15 0 1,15 * 1-5 /usr/bin/find');

    // Act: Call the parse method to get the result
    const result = parser.parse();

    // Assert: Verify each field is parsed and expanded correctly
    expect(result['minute']).toEqual(['0', '15', '30', '45']); // Step value for minutes
    expect(result['hour']).toEqual(['0']); // Single hour value
    expect(result['day of month']).toEqual(['1', '15']); // List of specific days
    expect(result['month']).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']); // Wildcard for all months
    expect(result['day of week']).toEqual(['1', '2', '3', '4', '5']); // Range of weekdays
    expect(result['command']).toEqual(['/usr/bin/find']); // The command to execute
  });

  /**
   * Test Case: Invalid cron string handling
   * This test verifies that the CronParser throws an error for an invalid cron string.
   */
  it('throws an error for an invalid cron string', () => {
    // Assert: Expect the constructor to throw an error for an invalid input
    expect(() => new CronParser('invalid string')).toThrow('Invalid cron string format');
  });
});
