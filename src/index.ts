// Entry point for the cron parser application

// Importing the CronParser class to handle cron string parsing
import { CronParser } from './CronParser';

// Importing the TableFormatter class to handle formatted output of the parsed data
import { TableFormatter } from './TableFormatter';

/**
 * Main logic starts here. Captures the cron string passed as a command-line argument.
 * Example: If the script is run as `node index.js "/15 0 1,15  1-5 /usr/bin/find"`
 * The `cronString` will hold "/15 0 1,15 * 1-5 /usr/bin/find".
 */
const cronString = process.argv[2];

// Check if the cron string is provided, otherwise show an error and exit the program
if (!cronString) {
  console.error('Usage: ./run.sh "<cron string>"'); // Display usage instructions
  process.exit(1); // Exit the program with an error code
}

try {
  /**
   * Instantiate the CronParser class with the provided cron string.
   * The constructor of CronParser validates the input and prepares it for parsing.
   * Example input: "/15 0 1,15 * 1-5 /usr/bin/find"
   */
  const parser = new CronParser(cronString);

  /**
   * Parse the cron string to get the result in a structured format.
   * Example parsed result:
   * {
   *   minute: ['0', '15', '30', '45'],
   *   hour: ['0'],
   *   'day of month': ['1', '15'],
   *   month: ['1', '2', '3', ..., '12'],
   *   'day of week': ['1', '2', '3', '4', '5'],
   *   command: ['/usr/bin/find']
   * }
   */
  const result = parser.parse();

  /**
   * Instantiate the TableFormatter with the parsed result for output formatting.
   * The TableFormatter formats the result into a table-like structure for display.
   */
  const formatter = new TableFormatter(result);

  /**
   * Format the result and display it in the console.
   * Example formatted output:
   * minute         0 15 30 45
   * hour           0
   * day of month   1 15
   * month          1 2 3 4 5 6 7 8 9 10 11 12
   * day of week    1 2 3 4 5
   * command        /usr/bin/find
   */
  console.log(formatter.format());
} catch (error) {
  /**
   * Catch and display any errors that occur during parsing or formatting.
   * Example error: "Invalid cron string format" if the input is incomplete or invalid.
   */
  console.error(`Error:`, error);
}
