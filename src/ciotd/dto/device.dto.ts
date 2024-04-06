import { ICommandDescriptionDto } from './command.dto';

export interface IDeviceDto {
  id: string;
  identifier: string;
  description: string;
  manufacturer: string;
  url: string;
  commands: ICommandDescriptionDto[];
}
