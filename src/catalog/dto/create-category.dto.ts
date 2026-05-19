import { MaxLength, MinLength, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  categoryName!: string;
}
