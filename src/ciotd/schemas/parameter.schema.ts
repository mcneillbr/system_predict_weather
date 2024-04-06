import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { IParameterDto } from '../dto/';
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
export class Parameter extends Document implements Omit<IParameterDto, 'id'> {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public description: string;

  toDto(): IParameterDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}

export type ParameterDocument = HydratedDocument<Parameter>;

export const ParameterSchema = SchemaFactory.createForClass(Parameter);
