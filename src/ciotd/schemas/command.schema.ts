import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { ICommandDto, IParameterDto } from '../dto';
import { Parameter } from './parameter.schema';
import { removeIdFromModel } from '../helpers/remove-id-from-model.helper';

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true, transform: removeIdFromModel },
})
export class Command extends Document implements Omit<ICommandDto, 'id'> {
  @Prop({ required: true, type: String })
  command: string;

  @Prop({ required: true, type: [Parameter] })
  parameters: IParameterDto[];

  toDto(): ICommandDto {
    return {
      id: this.id,
      command: this.command,
      parameters: this.parameters.map((parameter: any) => parameter.toDto()),
    };
  }
}

export type CommandDocument = HydratedDocument<Command>;

export const CommandSchema = SchemaFactory.createForClass(Command);
