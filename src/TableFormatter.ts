// Formats the parsed cron data into a readable table format

// Declaring the TableFormatter class, which is responsible for formatting the parsed cron data
export class TableFormatter {
  // Constructor accepts the parsed cron data as a key-value pair object
  // 'data' contains fields (e.g., 'minute', 'hour') as keys and their expanded values as arrays
  constructor(private data: Record<string, string[]>) {}

  /**
   * Formats the parsed cron data into a human-readable table format.
   * 
   * Example of the input 'data':
   * {
   *   minute: ['0', '15', '30', '45'],
   *   hour: ['0', '12'],
   *   'day of month': ['1', '15'],
   *   month: ['1', '6', '12'],
   *   'day of week': ['0', '6'],
   *   command: ['echo', 'Hello']
   * }
   * 
   * Example of the output format:
   * minute         0 15 30 45
   * hour           0 12
   * day of month   1 15
   * month          1 6 12
   * day of week    0 6
   * command        echo Hello
   */
  format(): string {
    return (
      Object.entries(this.data) // Convert the object into an array of [key, value] pairs
        .map(([key, values]) =>
          // Format each key-value pair into a row
          // `key.padEnd(14)` ensures the key is left-aligned with a width of 14 characters
          // `values.join(' ')` combines the array of values into a space-separated string
          `${key.padEnd(14)}${values.join(' ')}`
        )
        .join('\n') // Join all rows with newline characters to create the final table
    );
  }
}
