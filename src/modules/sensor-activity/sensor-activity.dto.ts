import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { SensorActivityModel } from './sensor-activity.model';

export class MeasuredValue {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @MaxLength(10)
  unit: string;
}

export default class SensorActivityDto {
  @IsNotEmpty()
  @IsNumber()
  sensorId: number;

  @IsNotEmpty()
  @IsNumber()
  timestamp: number;

  @IsNotEmpty()
  temperature: MeasuredValue;

  @IsNotEmpty()
  humidity: MeasuredValue;

  @IsNotEmpty()
  pressure: MeasuredValue;

  @IsNotEmpty()
  co2: MeasuredValue;

  static toDto(model: SensorActivityModel): SensorActivityDto {
    const rawData = JSON.parse(model.data);
    return {
      sensorId: +model.sensor_id,
      timestamp: +model.timestamp,
      ...rawData,
    };
  }

  static toModel(dto: SensorActivityDto) {
    return {
      sensor_id: dto.sensorId,
      timestamp: dto.timestamp,
      data: JSON.stringify({
        temperature: dto.temperature,
        humidity: dto.humidity,
        pressure: dto.pressure,
        co2: dto.co2,
      }),
    };
  }
}
