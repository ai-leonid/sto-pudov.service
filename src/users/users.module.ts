import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { RefreshToken, RefreshTokenSchema } from './schemas/refreshtoken.schema';
import { LoggerService } from '../common/service/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, LoggerService],
  exports: [UserService],
})
export class UserModule {}
