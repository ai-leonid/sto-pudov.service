import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'Password1@',
    description: 'Password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'example@mail.ru', description: 'email of the user' })
  @IsNotEmpty()
  email: string;
}
