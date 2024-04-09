import { IsNotEmpty } from "class-validator";

export interface IParameterDto {
  id: string;
  name: string;
  description: string;
}

export class ParameterInputDto implements Omit<IParameterDto, 'id'> {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
