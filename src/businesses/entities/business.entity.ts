import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BusinessModule } from './business-module.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { CategoryEntity } from '../../catalog/entities/category.entity';
import { UnitEntity } from '../../catalog/entities/unit.entity';
import { FinancialCategoryEntity } from '../../financial-categories/entities/financial-category.entity';

@Entity({ name: 'businesses' })
export class Business {
  @PrimaryGeneratedColumn('uuid', { name: 'business_id' })
  businessId!: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.businesses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user!: User;

  @Column({ type: 'varchar', name: 'business_name', length: 100 })
  businessName!: string;

  @Column({ type: 'varchar', name: 'business_category', length: 100 })
  businessCategory!: string;

  @OneToMany(() => Customer, (customer) => customer.business)
  customers!: Customer[];

  @OneToMany(() => BusinessModule, (businessModule) => businessModule.business)
  businessModules!: BusinessModule[];

  @OneToMany(() => UnitEntity, (unit) => unit.business)
  units!: UnitEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.business)
  categories!: CategoryEntity[];

  @OneToMany(
    () => FinancialCategoryEntity,
    (financialCategory) => financialCategory.business,
  )
  financialCategories!: FinancialCategoryEntity[];
}
