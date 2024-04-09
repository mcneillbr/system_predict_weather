import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CiotdService } from './../ciotd/ciotd.service';

function fakeWeatherSensorData(): any {
  const data = {
    temperature: 23,
    pressure: 60,
    altitud: 20,
    humidity: 60,
    stationTime: new Date().toISOString(),
  };

  return JSON.stringify(data);
}

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private iotService: CiotdService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron(): Promise<void> {
    this.logger.debug('List IoT device for uploading weather data');

    const devices = await this.iotService.getDeviceByLastUpdate();

    for (const device of devices) {
      device.commands.forEach((command) => {
        const runCmd = `${command.command.command} ${command.command.parameters.map((param) => param.name).join(' ')}`;

        this.logger.debug('run command', runCmd);

        command.result = fakeWeatherSensorData();

        this.iotService
          .updateDeviceById(device.id, device)
          .then(() => this.logger.debug(`the command id:${command.id} has been updated`))
          .catch((error) => this.logger.error(error));
      });
    }
  }
}
