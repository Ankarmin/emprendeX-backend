import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../orders/entities/order.entity';
import { QuotationEntity } from '../quotations/entities/quotation.entity';
import { UsersModule } from '../users/users.module';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, QuotationEntity]),
    UsersModule,
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
