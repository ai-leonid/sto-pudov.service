import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserRolesEnum } from 'src/users/users.enum';
const alphabet = '0123456789';
const nanoid = customAlphabet(alphabet, 13);

export type UserDocument = HydratedDocument<User>;
export const UserSchemaAlias = 'user';

@Schema({ timestamps: true })
export class User {
  @Prop({ require: true, type: String })
  firstName: string;

  @Prop({ require: true, type: String })
  lastName: string;

  @Prop({ type: String, default: '' })
  patronymic: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRolesEnum,
    default: UserRolesEnum.USER,
  })
  role: string;

  @Prop({ type: Date, default: now() })
  registrationDate: Date;

  @Prop({ type: String, default: null })
  password: string | null;

  @Prop({ type: String, unique: true, default: nanoid() })
  shortNumber: string;

  @Prop({ type: String, default: '' })
  mainPhone: string;

  @Prop({ type: [String], default: [] })
  extraPhones: string[];

  @Prop({ type: String, default: null })
  promoCode: string | null;

  @Prop({ type: [{ type: Types.ObjectId, ref: UserSchemaAlias }], default: [] })
  friendsIds: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: UserSchemaAlias, default: null })
  invitedById: Types.ObjectId;

  @Prop({ type: Object, default: null })
  bankDetails: any;

  @Prop({ type: Number, default: 0 })
  balance: number;

  @Prop({ type: String, default: null })
  hashRt: string | null;

  // @Prop({ type: String })
  // activationCode: string;

  // @Prop({ type: String })
  // emailCode: string;

  // @Prop({ type: String })
  // passwordResetCode;

  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this;
  mongoose
    .model('users')
    .findOne({ shortNumber: user.shortNumber })
    .then((existingDoc) => {
      if (existingDoc) {
        const err = new Error('Validation error: shortNumber must be unique');
        err.name = 'ValidationError';
        next(err);
      } else {
        next();
      }
    })
    .catch((error) => {
      next(error);
    });
});
