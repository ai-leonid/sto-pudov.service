import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { UserRolesEnum } from 'src/users/users.enum';

export class ResponseUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  role?: UserRolesEnum;

  @IsOptional()
  registrationDate?: Date;

  @IsOptional()
  @IsString()
  shortNumber?: string;

  @IsOptional()
  @IsString()
  mainPhone?: string;
}
