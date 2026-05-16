import { ArrayMinSize, ArrayUnique, IsArray, IsIn } from 'class-validator';
import { AVAILABLE_MODULE_IDS } from '../../users/users.constants';

export class UpdateOnboardingModulesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsIn(AVAILABLE_MODULE_IDS, { each: true })
  selectedModuleIds!: (typeof AVAILABLE_MODULE_IDS)[number][];
}
