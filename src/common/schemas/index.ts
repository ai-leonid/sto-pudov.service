import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema, UserSchemaAlias } from './user.schema';
import { RefreshTokenSchema, RefreshTokenSchemaAlias } from './refresh-token.schema';

export const importAllSchemas = () =>
  MongooseModule.forFeature([
    { name: UserSchemaAlias, schema: UserSchema },
    { name: RefreshTokenSchemaAlias, schema: RefreshTokenSchema },
  ]);
