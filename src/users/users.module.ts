import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { LoggerService } from '../common/service/logger.service';
import { importAllSchemas } from 'src/common/schemas';

@Module({
  imports: [importAllSchemas()],
  controllers: [UserController],
  providers: [UserService, LoggerService],
  exports: [UserService],
})
export class UserModule {}
