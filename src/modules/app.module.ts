import { Module } from '@nestjs/common';
import { createConfigModule } from './config.module-factory.js';
import { SensorActivityModule } from './sensor-activity/sensor-activity.module';
import { createSequelizeModule } from './sequelize.module-factory.js';

@Module({
  imports: [
    createConfigModule(),
    createSequelizeModule(),
    SensorActivityModule,
  ],
})
export class AppModule {}
