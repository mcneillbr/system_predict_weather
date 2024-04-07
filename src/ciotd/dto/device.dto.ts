import { IsArray, IsNotEmpty, ValidateNested, Equals } from 'class-validator';
import { Type } from 'class-transformer';
import { CommandDescriptionInputDto, ICommandDescriptionDto } from './command.dto';

export interface IDeviceDto {
  id: string;
  identifier: string;
  description: string;
  manufacturer: string;
  url: string;
  commands: ICommandDescriptionDto[];
}

export class DeviceInputDto implements Omit<IDeviceDto, 'id'> {
  @IsNotEmpty()
  identifier: string;
  
  description: string;

  @Equals('PredictWeather')
  manufacturer: string;

  @IsNotEmpty()
  url: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommandDescriptionInputDto)
  commands: ICommandDescriptionDto[];
}
