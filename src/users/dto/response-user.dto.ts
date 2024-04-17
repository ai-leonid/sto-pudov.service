import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Types } from 'mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Exclude()
export class ResponseUserDto extends PartialType(CreateUserDto) {
  @Expose({ name: '_id' })
  id?: Types.ObjectId;

  @Expose()
  registrationDate?: Date;

  @Expose()
  shortNumber?: string;

  @Expose()
  mainPhone?: string;

  @Expose()
  extraPhones?: string[];

  @Expose()
  promoCode?: string;

  @Expose()
  friendsIds?: Types.ObjectId[];

  @Expose()
  invitedById?: Types.ObjectId;

  @Expose()
  bankDetails?: string[];

  @Expose()
  balance?: number;

  @Expose()
  hashRt?: string | null;

  @Expose()
  @IsOptional()
  createdAt?: Date;

  @Expose()
  @IsOptional()
  updatedAt?: Date;
}
