import { db } from "./database";
import { down, up } from "./migrations/createTable";

const args = process.argv.slice(2); // Get command-line arguments

(async () => {
  try {
    if (args[0] === 'up') {
      console.log('Running migrations...');
      await up(db);
      console.log('Migrations applied successfully!');
    } else if (args[0] === 'down') {
      console.log('Rolling back migrations...');
      await down(db);
      console.log('Migrations rolled back successfully!');
    } else {
      console.log(`Unknown command: ${args[0]}`);
      console.log('Usage: node migration-runner.js <up|down>');
    }
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
})();
