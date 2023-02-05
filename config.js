// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

const envFilePath = `.env.${process.env.NODE_ENV || 'local'}`;

module.exports = (path = envFilePath) => {
  console.info(`Loading env configuration from "${path}"`);
  dotenv.config({ path });
  return () => ({
    env: process.env.NODE_ENV,
    httpPort: parseInt(process.env.HTTP_PORT, 10) || 3000,
    dbConfig: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
    },
  });
};
