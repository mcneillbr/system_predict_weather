import { Equals, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
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

export class CommandInputDto implements Omit<ICommandDto, 'id'> {
  @Equals('get_rainfall_intensity')
  command: string;

  @IsNotEmpty()
  parameters: IParameterDto[];
}

export class CommandDescriptionInputDto implements Omit<ICommandDescriptionDto, 'id'> {
  @ValidateNested()
  @Type(() => CommandInputDto)
  command: ICommandDto;

  @IsNotEmpty()
  operation: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  result: string;

  @IsNotEmpty()
  format: string;
}
