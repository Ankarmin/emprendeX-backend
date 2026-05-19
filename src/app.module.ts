import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { validateEnvironment } from './config/environment.validation';
import { CustomersModule } from './customers/customers.module';
import { HealthModule } from './health/health.module';
import { typeOrmModuleOptions } from './database/typeorm.config';
import { FinanceModule } from './finance/finance.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { ProductosServiciosModule } from './catalog/catalog.module';
import { PlansModule } from './plans/plans.module';
import { ReportsModule } from './reports/reports.module';
import { SalesModule } from './sales/sales.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate: validateEnvironment,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    AuthModule,
    ProductosServiciosModule,
    CustomersModule,
    SalesModule,
    FinanceModule,
    PlansModule,
    ReportsModule,
    CalendarModule,
    OnboardingModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
