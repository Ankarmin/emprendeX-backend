import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFinancialCategoryDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name!: string;
}
