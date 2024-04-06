import { Body, Controller, Delete, Get, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { Observable, catchError, of } from 'rxjs';
import { UserService } from './user.service';
import { IUserDto, UserDto } from './dto/user.dto';

interface ISuccessResponse {
  success: boolean;
}

class UserParams {
  @IsNotEmpty()
  id: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<ISuccessResponse> {
    try {
      await this.userService.create(user);
      return { success: true };
    } catch (error) {
      if (error?.errorResponse.code === 11000) {
        throw new HttpException(error?.errorResponse.errmsg, HttpStatus.CONFLICT);
      } else {
        throw error;
      }
    }
  }

  @Get()
  findAll(): Observable<IUserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UserParams): Observable<IUserDto> {
    return this.userService.findOne(params.id).pipe(
      catchError(() => {
        throw new HttpException(`user ${params.id} not found`, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Delete(':id')
  async delete(@Param() params: UserParams): Promise<ISuccessResponse> {
    return {
      success: await this.userService.delete(params.id),
    };
  }
}
