import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { ICommandDescriptionDto, ICommandDto } from '../dto';
import { Command } from './command.schema';
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
export class CommandDescription extends Document implements Omit<ICommandDescriptionDto, 'id'> {
  @Prop({ required: true, type: String })
  operation: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Command })
  command: ICommandDto;

  @Prop({ required: true, type: String })
  result: string;

  @Prop({ required: true, type: String })
  format: string;

  toDto(): ICommandDescriptionDto {
    return {
      id: this.id,
      operation: this.operation,
      description: this.description,
      command: this.command,
      result: this.result,
      format: this.format,
    };
  }
}

export type CommandDescriptionDocument = HydratedDocument<CommandDescription>;

export const CommandDescriptionSchema = SchemaFactory.createForClass(CommandDescription);
