import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CiotdService } from './ciotd.service';
import { CiotdController } from './ciotd.controller';
import { Device, DeviceSchema } from './schemas';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }], 'master'),
  ],
  controllers: [CiotdController],
  providers: [CiotdService],
})
export class CiotdModule {}

