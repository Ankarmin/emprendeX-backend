import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUnitDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  unitName?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  abbreviation?: string;
}
