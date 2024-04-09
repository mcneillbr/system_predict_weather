import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable, map } from 'rxjs';
import { Device, DeviceDocument } from './schemas';
import { DeviceInputDto, IDeviceDto } from './dto';

@Injectable()
export class CiotdService {
  constructor(@InjectModel(Device.name, 'master') private deviceModel: Model<Device>) {}

  findAll(): Observable<Partial<IDeviceDto>[]> {
    const devices = from(this.deviceModel.find().exec());

    return devices;
  }

  findOne(identifier: string): Observable<Partial<IDeviceDto>> {
    return from(this.deviceModel.findOne({ identifier }).exec()).pipe(
      map((device) => {
        if (!device) {
          throw new Error('Device not found');
        }
        return device.toObject();
      }),
    );
  }

  getDeviceByLastUpdate(): Promise<DeviceDocument[]> {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 1);

    return this.deviceModel
      .find({
        'commands.command.updated_at': { $lte: currentDate },
      })
      .exec();
  }

  async create(device: DeviceInputDto): Promise<Device> {
    const model = await this.deviceModel.create(device);

    return model;
  }

  async update(identifier: string, device: DeviceInputDto): Promise<boolean> {
    const options = { new: false, upsert: false };
    const filter = { identifier };

    const result = await this.deviceModel.updateOne(filter, device, options);

    return result.acknowledged && result.modifiedCount > 0;
  }

  async updateDeviceById(deviceId: string, device: DeviceDocument): Promise<boolean> {
    const options = { new: false, upsert: false };

    const result = await this.deviceModel.updateOne({ _id: deviceId }, device);

    return result.acknowledged && result.modifiedCount > 0;
  }

  async delete(identifier: string): Promise<boolean> {
    const result = await this.deviceModel.deleteOne({ identifier }).exec();

    return result.deletedCount > 0;
  }
}
