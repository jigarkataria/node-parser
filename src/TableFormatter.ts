
// Formats the parsed cron data into a readable table format
export class TableFormatter {
  constructor(private data: Record<string, string[]>) {}

  format(): string {
    return Object.entries(this.data)
      .map(([key, values]) => `${key.padEnd(14)}${values.join(' ')}`)
      .join('\n');
  }
}
