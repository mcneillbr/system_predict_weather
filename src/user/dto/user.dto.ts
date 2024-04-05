import { IsNotEmpty } from 'class-validator';

export interface IUserDto {
  readonly id?: string; 
  readonly userName: string;
  readonly name: string;
  readonly role: string;
  readonly password?: string;
}

export class UserDto implements IUserDto {
  @IsNotEmpty()
  readonly userName: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly role: string;

  @IsNotEmpty()
  readonly password: string;
}
