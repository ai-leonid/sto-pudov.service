import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User, UserSchema, UserSchemaAlias } from './schemas/user.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
  RefreshTokenSchemaAlias,
} from 'src/users/schemas/refresh-token.schema';
import { LoggerService } from '../common/service/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaAlias, schema: UserSchema },
      { name: RefreshTokenSchemaAlias, schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, LoggerService],
  exports: [UserService],
})
export class UserModule {}
