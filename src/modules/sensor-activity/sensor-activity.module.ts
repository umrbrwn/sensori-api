import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SensorActivityModel } from './sensor-activity.model';
import { SensorActivityController } from './sensor-activity.controller';
import { SensorActivityService } from './sensor-activity.service';

@Module({
  imports: [SequelizeModule.forFeature([SensorActivityModel])],
  controllers: [SensorActivityController],
  providers: [SensorActivityService],
})
export class SensorActivityModule {}
