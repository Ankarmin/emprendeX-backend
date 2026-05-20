import { IsUUID, Matches } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  orderId!: string;

  @IsUUID()
  paymentMethodId!: string;

  @Matches(/^\d+(\.\d{1,2})?$/)
  amount!: string;
}
