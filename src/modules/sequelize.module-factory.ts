import { SequelizeModule } from '@nestjs/sequelize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../config.js');

export const createSequelizeModule = (envFilePath?: string) => {
  const configurations = config(envFilePath)();
  const seqOptions = {
    ...configurations.dbConfig,
    port: +configurations.dbConfig.port,
    dialect: 'postgres',
    protocol: 'postgres',
    autoLoadModels: true,
    synchronize: true,
  };
  if (['production', 'test'].includes(configurations.env)) {
    seqOptions.logging = false;
  }
  return SequelizeModule.forRoot(seqOptions);
};

export const createTestSequelizeModule = () =>
  createSequelizeModule('.env.test');
