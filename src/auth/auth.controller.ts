import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { LoggerService } from '../common/service/logger.service';
import { SignInDto } from './dto/signIn.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { HttpExceptionFilter } from '../utils/http-exception.filter';
import { RtGuard } from 'src/common/guards';
import { v4 as uuid } from 'uuid';
import {
  sendResponse,
  loginSuccessResponse,
  loginErrorResponse,
  refreshErrorResponse,
} from 'src/utils';
import { statusMessage } from '../constant/statusMessage';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, GetCurrentUserId } from '../common/decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  [x: string]: any;

  constructor(private _authService: AuthService, private readonly _logger: LoggerService) {}

  // @ApiResponse(loginSuccessResponse)
  // @ApiResponse(loginErrorResponse)
  @Public()
  // @HttpCode(200)
  @Post('/login')
  // @UseFilters(new HttpExceptionFilter())
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const id: string = uuid();
    this._logger.log('User login api called', id, 'auth.controller.ts', 'POST', '/login', 'signIn');
    const token = await this._authService.signIn(signInDto.email, signInDto.password);

    res.cookie('accessToken', token.accessToken, {
      httpOnly: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: '/',
      sameSite: 'none',
      secure: false,
    });

    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: '/',
      sameSite: 'none',
      secure: false,
    });

    return sendResponse(res, HttpStatus.OK, statusMessage[HttpStatus.OK], true, null);
  }

  // @ApiResponse(loginSuccessResponse)
  // @ApiResponse(refreshErrorResponse)
  @ApiCookieAuth('refreshToken')
  @ApiBearerAuth('JWT-auth')
  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async refreshTokens(
    @GetCurrentUser('user') payload: any,
    @GetCurrentUser('user') userId: string,
    @Res() res: Response,
  ) {
    const tokens = await this._authService.getTokens(payload);
    const id: string = uuid();
    this._logger.log(
      'User refresh api called',
      id,
      'auth.controller.ts',
      'POST',
      '/refresh',
      'refreshTokens',
    );
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: '/',
      sameSite: 'none',
      secure: false,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: '/',
      sameSite: 'none',
      secure: false,
    });

    return sendResponse(res, HttpStatus.OK, statusMessage[HttpStatus.OK], true, null);
  }
}
