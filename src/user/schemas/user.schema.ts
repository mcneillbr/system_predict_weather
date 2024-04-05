import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUserDto } from '../dto';

enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User implements IUserDto {
  @Prop({ required: true, unique: true, index: true })
  public userName: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.Guest })
  public role: UserRole;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
