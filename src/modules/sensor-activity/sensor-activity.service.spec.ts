import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import SensorActivityDto from './sensor-activity.dto';
import { SensorActivityService } from './sensor-activity.service';
import { createTestConfigModule } from '../config.module-factory';
import { createTestSequelizeModule } from '../sequelize.module-factory';
import { SensorActivityModel } from './sensor-activity.model';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateSensorData } = require('../../helpers/sensor-data.js');

describe('SensorActivityService', () => {
  let service: SensorActivityService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        createTestConfigModule(),
        createTestSequelizeModule(),
        SequelizeModule.forFeature([SensorActivityModel]),
      ],
      providers: [SensorActivityService],
    }).compile();

    service = app.get<SensorActivityService>(SensorActivityService);
  });

  describe('sensor activity data service', () => {
    it('should create sensor activity data', async () => {
      const now = Date.now();
      const data = SensorActivityDto.toDto(generateSensorData(now, now));
      const created = await service.create(data);
      expect(created).toBeDefined();
      expect(SensorActivityDto.toDto(created)).toEqual(data);
    });

    it('should check contract properties explicitly', async () => {
      const now = Date.now();
      const data = SensorActivityDto.toDto(generateSensorData(now, now));
      const created = await service.create(data);
      const result = SensorActivityDto.toDto(created);
      expect(result.sensorId).toEqual(data.sensorId);
      expect(result.timestamp).toEqual(data.timestamp);
      expect(result.temperature).toEqual(data.temperature);
      expect(result.humidity).toEqual(data.humidity);
      expect(result.pressure).toEqual(data.pressure);
      expect(result.co2).toEqual(data.co2);
    });

    it('should get 5 recent activities of the sensor', async () => {
      const data = [];
      const sensorId = Date.now();
      // add 10 entries for a sensor
      for (let i = 0; i < 10; i++) {
        data.push(SensorActivityDto.toDto(generateSensorData(i, sensorId)));
      }
      await Promise.all(data.map((e) => service.create(e)));
      // get last 5 wrt to timestamp sorted in desc order
      const result = await service.getById(sensorId);
      expect(result.length).toEqual(5);
      // most recent wrt to time is the one entered last
      expect(result[0]).toEqual(data[9]);
      // 5th entery from most recent one
      expect(result[4]).toEqual(data[5]);
    });
  });
});
