import dotenv from 'dotenv'

dotenv.config()
export default {
    persistence: process.env.PERSISTENCE
}

// import { Command } from 'commander';

// const program = new Command();
// program.option('--mode <mode>', 'Modo de trabajo', 'DEVELOPMENT');
// program.parse();

// dotenv.config({
//   path: program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production',
// });

// export default {
//   port: process.env.PORT,
//   mongoUrl: process.env.MONGO_URL,
// };