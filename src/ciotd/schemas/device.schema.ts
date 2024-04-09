import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { ICommandDescriptionDto, IDeviceDto } from '../dto';
import { CommandDescription } from './command-description.schema';
import { removeIdFromModel } from '../helpers';

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true, transform: removeIdFromModel },
})
export class Device extends Document implements Omit<IDeviceDto, 'id'> {
  @Prop({ required: true, type: String, unique: true, index: true })
  identifier: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  manufacturer: string;

  @Prop({ required: true, type: String })
  url: string;

  @Prop({ required: true, type: [CommandDescription] })
  commands: ICommandDescriptionDto[];

  toDto(): IDeviceDto {
    return {
      id: this.id,
      identifier: this.identifier,
      description: this.description,
      manufacturer: this.manufacturer,
      url: this.url,
      commands: this.commands.map((command: any) => command.toDto()),
    };
  }
}

export type DeviceDocument = HydratedDocument<Device>;

export const DeviceSchema = SchemaFactory.createForClass(Device);
