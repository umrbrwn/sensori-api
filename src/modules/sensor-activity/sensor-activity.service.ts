import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import SensorActivityDto from './sensor-activity.dto';
import { SensorActivityModel } from './sensor-activity.model';

@Injectable()
export class SensorActivityService {
  constructor(
    @InjectModel(SensorActivityModel)
    private sensorActivityModel: typeof SensorActivityModel,
  ) {}

  /** Get recent 5 entries of given sensor id */
  async getById(sensorId: number): Promise<SensorActivityDto[]> {
    const data = await this.sensorActivityModel.findAll({
      where: { sensor_id: sensorId },
      limit: 5,
      order: [['timestamp', 'DESC']],
    });
    return data.map((d) => SensorActivityDto.toDto(d));
  }

  /** Insert new sensor activity data */
  create(dto: SensorActivityDto) {
    // TODO: handle unique constraint error caused when saving same timestamp for a sensor
    // leaving it optimistacally for now
    return this.sensorActivityModel.create(SensorActivityDto.toModel(dto));
  }
}
