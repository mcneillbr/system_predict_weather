import { IParameterDto } from './parameter.dto';

export interface ICommandDto {
  id: string;
  command: string;
  parameters: IParameterDto[];
}

export interface ICommandDescriptionDto {
  id: string;
  operation: string;
  description: string;
  command: ICommandDto;
  result: string;
  format: string;
}
