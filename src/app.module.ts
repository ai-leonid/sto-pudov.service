import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerService } from './common/service/logger.service';
import { LoggerMiddleware } from './common/service/loggermiddleware.service';
import { DatabaseModule } from './config/database.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaAlias } from 'src/common/schemas/user.schema';
import { Model } from 'mongoose';
import { nanoid } from 'src/utils/nanoid';
import { importAllSchemas } from 'src/common/schemas';
import { TransactionsModule } from './transactions/transactions.module';
import { OrdersModule } from './orders/orders.module';

console.log(`${process.cwd()}/.env.${process.env.NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    DatabaseModule,
    UserModule,
    AuthModule,
    WithdrawalsModule,
    TransactionsModule,
    OrdersModule,
  ],
  providers: [LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
