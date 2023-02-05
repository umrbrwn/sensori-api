import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { SensorActivityController } from './sensor-activity.controller';
import SensorActivityDto from './sensor-activity.dto';
import { SensorActivityService } from './sensor-activity.service';
import { createTestConfigModule } from '../config.module-factory';
import { createTestSequelizeModule } from '../sequelize.module-factory';
import { SensorActivityModel } from './sensor-activity.model';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateSensorData } = require('../../helpers/sensor-data.js');

describe('SensorActivityController', () => {
  let controller: SensorActivityController;
  let service: SensorActivityService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        createTestConfigModule(),
        createTestSequelizeModule(),
        SequelizeModule.forFeature([SensorActivityModel]),
      ],
      controllers: [SensorActivityController],
      providers: [SensorActivityService],
    }).compile();

    controller = app.get<SensorActivityController>(SensorActivityController);
    service = app.get<SensorActivityService>(SensorActivityService);
  });

  describe('sensor activity data controller', () => {
    it('should add sensor activity data', async () => {
      const now = Date.now();
      const data = SensorActivityDto.toDto(generateSensorData(now, now));
      await controller.create(data);
      const result = await service.getById(data.sensorId);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toEqual(data);
    });

    it('should get 5 recent activities of the sensor', async () => {
      const data = [];
      const sensorId = Date.now();
      // add 10 entries for a sensor
      for (let i = 0; i < 10; i++) {
        const a = SensorActivityDto.toDto(generateSensorData(i, sensorId));
        data.push(a);
      }
      await Promise.all(data.map((e) => service.create(e)));
      // get last 5 wrt to timestamp sorted in desc order
      const result = await controller.get(sensorId);
      expect(result.length).toEqual(5);
      // most recent wrt to time is the one entered last
      expect(result[0]).toEqual(data[9]);
      // 5th entery from most recent one
      expect(result[4]).toEqual(data[5]);
    });
  });
});
