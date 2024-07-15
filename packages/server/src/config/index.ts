import { createLogger, transports, format } from 'winston';
const logger = createLogger({
  level: 'info',
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()],
});
export const CONFIG = Object.freeze({
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  HOST: process.env.HOST || '0.0.0.0',
  DB: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_NAME: process.env.DATABASE_NAME,
  },
});
// Log the database connection details using winston
logger.info(`Database Connection Details:
  URL: ${CONFIG.DB.DATABASE_URL}
  Name: ${CONFIG.DB.DATABASE_NAME}
`);
