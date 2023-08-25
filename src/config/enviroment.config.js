import dotenv from 'dotenv'

// dotenv.config()
// export default {
//     persistence: process.env.PERSISTENCE,
//     //persistence:"MEMORY"
// }

 import { Command } from 'commander';

const program = new Command();
program.option('--mode <mode>', 'DEVELOPMENT');
program.parse();

dotenv.config({
  path: program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production',
});

export default {
  port: process.env.PORT,
  persistence: process.env.PERSISTENCE,
};
