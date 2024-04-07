import { Body, Controller, Delete, Get, Param, Post, HttpException, HttpStatus, Put } from '@nestjs/common';
import { Observable, catchError, of } from 'rxjs';
import { IsNotEmpty } from 'class-validator';
import { DeviceInputDto, IDeviceDto } from './dto';
import { CiotdService } from './ciotd.service';

class DeviceParams {
  @IsNotEmpty()
  identifier: string;
}

interface ISuccessResponse {
  success: boolean;
}

@Controller('device')
export class CiotdController {
  constructor(private readonly service: CiotdService) {}

  @Get()
  findAll(): Observable<Partial<IDeviceDto>[]> {
    return this.service.findAll();
  }

  @Get(':identifier')
  findOne(@Param() params: DeviceParams): Observable<Partial<IDeviceDto>> {
    return this.service.findOne(params.identifier).pipe(
      catchError(() => {
        throw new HttpException(`device ${params.identifier} not found`, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Post()
  async create(@Body() device: DeviceInputDto): Promise<ISuccessResponse> {
    try {
      await this.service.create(device);
      return { success: true };
    } catch (error) {
      if (error?.errorResponse.code === 11000) {
        throw new HttpException(error?.errorResponse.errmsg, HttpStatus.CONFLICT);
      } else {
        throw error;
      }
    }
  }

  @Put(':identifier')
  async update(@Param() params: DeviceParams, @Body() device: DeviceInputDto): Promise<ISuccessResponse> {
    const result = await this.service.update(params.identifier, device);

    if (!result) {
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }

    return { success: result };
  }

  @Delete(':identifier')
  async delete(@Param() params: DeviceParams): Promise<ISuccessResponse> {
    const result = await this.service.delete(params.identifier);

    if (!result) {
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }

    return {
      success: result,
    };
  }
}
