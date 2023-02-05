import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import SensorActivityDto from './sensor-activity.dto';
import { SensorActivityService } from './sensor-activity.service';

@Controller('/api/sensor-activity')
export class SensorActivityController {
  constructor(private readonly sensorService: SensorActivityService) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<SensorActivityDto[]> {
    return this.sensorService.getById(id);
  }

  @Post()
  async create(@Body() data: SensorActivityDto) {
    await this.sensorService.create(data);
  }
}
