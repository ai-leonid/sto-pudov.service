import { Module } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from './withdrawals.controller';
import { importAllSchemas } from 'src/common/schemas';
import { UserService } from 'src/users/users.service';
import { UserModule } from 'src/users/users.module';
import { LoggerService } from 'src/common/service/logger.service';

@Module({
  imports: [importAllSchemas(), UserModule],
  controllers: [WithdrawalsController],
  providers: [WithdrawalsService, UserService, LoggerService],
  exports: [WithdrawalsService],
})
export class WithdrawalsModule {}
