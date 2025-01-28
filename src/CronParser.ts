// Parses a cron string into its components and expands them into schedules

// Importing a utility function for expanding cron field ranges
import { expandRange } from './utils/RangeExpander';

// Defining a type for the fields in a cron expression
// A cron field can be one of 'minute', 'hour', 'day of month', 'month', or 'day of week'
type CronField = 'minute' | 'hour' | 'day of month' | 'month' | 'day of week';

// Defining the valid range limits for each cron field
const CRON_LIMITS: Record<CronField, [number, number]> = {
  minute: [0, 59], // Minutes range from 0 to 59
  hour: [0, 23],   // Hours range from 0 to 23
  'day of month': [1, 31], // Days of the month range from 1 to 31
  month: [1, 12],          // Months range from 1 to 12
  'day of week': [0, 6],   // Days of the week range from 0 (Sunday) to 6 (Saturday)
};

// Declaring the CronParser class, which handles the parsing of a cron string
export class CronParser {
  // Properties to store the cron fields and the command part of the cron expression
  private fields: string[]; // Array for cron fields (minute, hour, etc.)
  private command: string;  // The command to be executed by the cron expression

  // Constructor to initialize the CronParser with the given cron string
  constructor(private cronString: string) {
    // Splitting the cron string into parts based on spaces
    const parts = cronString.split(' ');

    // Validating the cron string format; it must have at least 6 parts (5 fields + 1 command)
    if (parts.length < 6) {
      throw new Error('Invalid cron string format'); // Throw an error for invalid input
    }

    // Assigning the first 5 parts to the fields and the remaining parts to the command
    this.fields = parts.slice(0, 5); // The first 5 parts represent cron fields
    this.command = parts.slice(5).join(' '); // The rest represent the command to execute
  }

  // Method to parse the cron string and expand each field into its schedule
  parse() {
    // Object to store the parsed and expanded result for each cron field
    const result: Record<string, string[]> = {};

    // Iterating over each field in the CRON_LIMITS object
    Object.keys(CRON_LIMITS).forEach((field, index) => {
      // Expanding the cron field using the expandRange utility function
      // The field value and its valid range are passed to expandRange
      result[field] = expandRange(this.fields[index], CRON_LIMITS[field as CronField]);
    });

    // Adding the command as a separate field in the result
    result['command'] = [this.command];

    // Returning the fully parsed and expanded result
    return result;
  }
}
