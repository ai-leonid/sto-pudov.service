import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now, Types } from 'mongoose';
import { UserSchemaAlias } from 'src/common/schemas/user.schema';

export type WithdrawalDocument = HydratedDocument<Withdrawal>;

export const WithdrawalSchemaAlias = 'withdrawal';

export enum WithdrawalStatusEnum {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  MODERATE = 'moderate',
}

@Schema({ timestamps: true })
export class Withdrawal {
  @Prop({ required: true, type: String })
  bankDetails: string;
  @Prop({ required: true, type: Types.ObjectId, ref: UserSchemaAlias })
  userId: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  amount: number;

  @Prop({
    required: true,
    type: String,
    enum: WithdrawalStatusEnum,
    default: WithdrawalStatusEnum.PROCESSING,
  })
  status: string;

  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
}

export const WithdrawalSchema = SchemaFactory.createForClass(Withdrawal);
