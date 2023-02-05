import { ConfigModule } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../config.js');

export const createConfigModule = (envFilePath?: string) =>
  ConfigModule.forRoot({
    load: [config(envFilePath)],
    isGlobal: true,
  });

export const createTestConfigModule = () => createConfigModule('.env.test');
