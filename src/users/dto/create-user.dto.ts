import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'first of the user' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'lastname of the user' })
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  patronymic?: string;

  @ApiProperty({
    example: 'Password1@',
    description: 'Password length min 8,1 lowercase and uppercase letter, 1 number ,1 symbol',
  })
  // @IsStrongPassword({
  //   minLength: 8,
  //   minLowercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  //   minUppercase: 1,
  // })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'ivan@example.com', description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
