import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ type: String })
  userId: string;
  @Prop({ type: Boolean })
  isRevoked: boolean;
  @Prop({ type: Date })
  expires: Date;
  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
export const RefreshTokenSchemaAlias = 'refresh-token';
