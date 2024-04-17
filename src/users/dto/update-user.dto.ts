import { Exclude, Expose } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { UserRolesEnum } from 'src/users/users.enum';
import { now, Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { UserSchemaAlias } from 'src/common/schemas/user.schema';

export class ResponseUserDto extends PartialType(CreateUserDto) {
  // @Expose()

  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;

  role: string;

  registrationDate: Date;

  password: string | null;

  shortNumber: string;

  mainPhone: string;

  extraPhones: string[];

  promoCode: string | null;

  friendsIds: Types.ObjectId[];

  invitedById: Types.ObjectId;

  bankDetails: any;

  balance: number;

  hashRt: string | null;
}
