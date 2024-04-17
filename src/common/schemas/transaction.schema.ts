import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now, Types } from 'mongoose';
import { UserSchemaAlias } from 'src/common/schemas/user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;
export const TransactionSchemaAlias = 'transaction';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, type: Types.ObjectId, ref: UserSchemaAlias })
  userId: Types.ObjectId;

  @Prop({ required: true, type: String })
  fromName: string;

  @Prop({ default: now() })
  date: Date;

  @Prop({ type: Number, default: 0 })
  amount: number;

  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
