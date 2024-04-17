import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema, UserSchemaAlias } from './user.schema';
import { OrderSchema, OrderSchemaAlias } from './order.schema';
import { WithdrawalSchema, WithdrawalSchemaAlias } from './withdrawal.schema';
import { TransactionSchema, TransactionSchemaAlias } from './transaction.schema';
import { RefreshTokenSchema, RefreshTokenSchemaAlias } from './refresh-token.schema';

export const importAllSchemas = () =>
  MongooseModule.forFeature([
    { name: UserSchemaAlias, schema: UserSchema },
    { name: OrderSchemaAlias, schema: OrderSchema },
    { name: WithdrawalSchemaAlias, schema: WithdrawalSchema },
    { name: TransactionSchemaAlias, schema: TransactionSchema },
    { name: RefreshTokenSchemaAlias, schema: RefreshTokenSchema },
  ]);
