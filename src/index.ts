
// Entry point for the cron parser application
import { CronParser } from './CronParser';
import { TableFormatter } from './TableFormatter';

const cronString = process.argv[2];

if (!cronString) {
  console.error('Usage: ./run.sh "<cron string>"');
  process.exit(1);
}

try {
  // Instantiate parser and process the cron string
  const parser = new CronParser(cronString);
  const result = parser.parse();

  // Format and display the result
  const formatter = new TableFormatter(result);
  console.log(formatter.format());
} catch (error) {
  console.error(`Error:`,error);
}
