import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'first of the user' })
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'lastname of the user' })
  lastName: string;

  @ApiProperty({
    example: 'Password1@',
    description: 'Password length min 8,1 lowercase and uppercase letter, 1 number ,1 symbol',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @ApiProperty({ example: 'ivan@example.com', description: 'email of the user' })
  email: string;

  @ApiProperty({ description: 'Date of creation' })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ description: 'Date of updated' })
  @IsOptional()
  updatedAt?: Date;
}
