import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { WithdrawalStatusEnum } from 'src/common/schemas/withdrawal.schema';

export class CreateWithdrawalDto {
  @IsNotEmpty()
  @IsString()
  bankDetails: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(WithdrawalStatusEnum)
  status: string;
}
