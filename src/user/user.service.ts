import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from 'mongodb';
import { User } from './schemas';
import { IUserDto, UserDto } from './dto/user.dto';
import { from, Observable, map } from 'rxjs';

function mapUser(user: Document): IUserDto {
  if (!user) {
    throw new Error('user not found');
  }

  return {
    id: user._id,
    userName: user.userName,
    name: user.name,
    role: user.role,
  };
}

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name, 'master') private userModel: Model<User>) {}

  async create(user: UserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  findOne(userName: string): Observable<IUserDto> {
    return from(this.userModel.findOne({ userName }).exec()).pipe(map(mapUser));
  }

  findAll(): Observable<IUserDto[]> {
    const users = from(this.userModel.find().exec());

    return users.pipe(
      map((users: Document[]) => {
        return users.map(mapUser);
      }),
    );
  }

  async delete(userName: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ userName }).exec();

    return result.deletedCount > 0;
  }
}
