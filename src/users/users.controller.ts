import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { LoggerService } from '../common/service/logger.service';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import {
  sendResponse,
  userErrorResponse,
  userListSuccessResponse,
  userSuccessResponse,
} from '../utils';
import { statusMessage } from '../constant/statusMessage';
import { HttpExceptionFilter } from '../utils/http-exception.filter';
import { IResponseData, IUserData } from '../interface/common';
import { AuthGuard } from 'src/common/guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('users')
@Controller('/v1/users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly logger: LoggerService) {}

  @ApiOperation({
    summary: 'Create user',
    description: 'User signup app',
  })
  // @ApiResponse(userSuccessResponse)
  // @ApiResponse(userErrorResponse)
  @Public()
  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<ResponseUserDto> {
    const id: string = uuid();
    this.logger.log(
      'User create api called',
      id,
      'users.controller.ts',
      'POST',
      '/users',
      'create',
    );
    const user = await this.userService.create(createUserDto);
    return sendResponse(
      res,
      HttpStatus.CREATED,
      statusMessage[HttpStatus.CREATED],
      true,
      plainToInstance(ResponseUserDto, user),
    );
  }

  // get user
  @ApiOperation({
    summary: 'User List',
    description: 'Get User List',
  })
  // @ApiResponse(userListSuccessResponse)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll(@Res() res: Response): Promise<ResponseUserDto[]> {
    const id: string = uuid();
    this.logger.log('User list api called', id, 'users.controller.ts', 'GET', '/users', 'findAll');
    const usersList = await this.userService.findAll();

    return sendResponse(
      res,
      HttpStatus.OK,
      statusMessage[HttpStatus.OK],
      true,
      plainToInstance(ResponseUserDto, usersList),
    );
  }
}
