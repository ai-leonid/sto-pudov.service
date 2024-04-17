import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now, Types } from 'mongoose';
import { UserSchemaAlias } from 'src/common/schemas/user.schema';

export type OrderDocument = HydratedDocument<Order>;
export const OrderSchemaAlias = 'order';

export enum OrderStatusEnum {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  MODERATE = 'moderate',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: String })
  orderNumber: string;

  @Prop({ required: true, type: Types.ObjectId, ref: UserSchemaAlias })
  userId: Types.ObjectId;

  @Prop({ default: now() })
  date: Date;

  @Prop({ type: Number, default: 0 })
  amount: number;

  @Prop({ type: Object })
  parts: any;

  @Prop({ type: Object })
  works: any;

  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
