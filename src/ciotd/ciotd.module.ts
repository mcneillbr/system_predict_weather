import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CiotdService } from './ciotd.service';
import { CiotdController } from './ciotd.controller';
import { Command, CommandSchema, Device, DeviceSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Device.name, schema: DeviceSchema },
        { name: Command.name, schema: CommandSchema },
      ],
      'master',
    ),
  ],
  controllers: [CiotdController],
  providers: [CiotdService],
  exports: [CiotdService],
})
export class CiotdModule {}
