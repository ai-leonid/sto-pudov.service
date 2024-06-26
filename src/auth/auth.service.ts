import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggerService } from '../common/service/logger.service';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../auth/constants';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  async signIn(email: string, pass: string) {
    const id: string = uuid();
    this.logger.log('auth service api called', id, 'auth.service.ts', '', '', 'signIn-service');
    const user = await this.usersService.findOneByEmail(email);
    const match = await bcrypt.compare(pass, user?.password);

    if (match) {
      const payload = { email: user.email, userId: user._id.toString() };
      const tokens = await this.getTokens(payload);
      return {
        ...tokens,
      };
    }
    throw new UnauthorizedException();
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.usersService.findOneById(userId);

    if (!user || !user.hashRt) throw new ForbiddenException('Access Denied.');

    const rtMatches = await bcrypt.compare(rt, user.hashRt);

    if (!rtMatches) throw new ForbiddenException('Access Denied.');

    const tokens = await this.getTokens(user);

    const rtHash = await this.hashPassword(tokens.refreshToken);

    await this.usersService.updateOne(user._id, { hashRt: rtHash });
    return tokens;
  }

  async getTokens(user: any) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.userId,
          email: user.email,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '24h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.userId,
          email: user.email,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async hashPassword(data: string) {
    return bcrypt.hash(data, 10);
  }
}
