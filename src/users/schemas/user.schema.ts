import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  username: string;
  @Prop({ type: String })
  firstName: string;
  @Prop({ type: String })
  lastName: string;
  @Prop({ type: String })
  activationCode: string;
  @Prop({ type: String })
  email: string;
  @Prop({ type: String })
  emailCode: string;
  @Prop({ type: String })
  password: string;
  @Prop({ type: String })
  passwordResetCode;
  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaAlias = 'user';
