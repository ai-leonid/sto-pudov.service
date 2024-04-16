import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'testname', description: 'username of the user' })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ example: 'Pradip', description: 'first of the user' })
  firstName: string;
  @ApiProperty({ example: 'Patil', description: 'lastname of the user' })
  lastName: string;
  @ApiProperty({
    example: 'Pass@',
    description: 'Password length min 8,1 lowerscase and uppercase letter, 1 number ,1symbol',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
  passwordResetCode?: string;
  @ApiProperty({ example: 'Patil@test.com', description: 'email of the user' })
  email: string;
  @ApiPropertyOptional({ example: 'SDD1333', description: 'email code of the user' })
  emailCode?: string;
  @IsOptional()
  @ApiPropertyOptional({ example: '22221111', description: 'email code of the user' })
  activationCode?: string;
  @ApiProperty({ description: 'Date of creation' })
  @IsOptional()
  createdAt?: Date;
  @ApiProperty({ description: 'Date of updated' })
  @IsOptional()
  updatedAt?: Date;
}
