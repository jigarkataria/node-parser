
# Cron Parser

## Description
A TypeScript command-line application that parses a standard cron string, expands its fields, and outputs the schedule in a tabular format.

## Usage
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Run the application:
   ```
   npm start -- "*/15 0 1,15 * 1-5 /usr/bin/find"
   ```

## Test
Run unit tests:
```
npm test
```
