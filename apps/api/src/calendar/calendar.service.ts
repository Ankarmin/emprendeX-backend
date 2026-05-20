import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../orders/entities/order.entity';
import { QuotationEntity } from '../quotations/entities/quotation.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CalendarService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    @InjectRepository(QuotationEntity)
    private readonly quotationsRepository: Repository<QuotationEntity>,
  ) {}

  async listEvents(userId: string) {
    const business =
      await this.usersService.findPrimaryBusinessByUserId(userId);
    if (!business) {
      return [];
    }

    const [orders, quotations] = await Promise.all([
      this.ordersRepository.find({
        where: { quotation: { customer: { businessId: business.businessId } } },
        relations: { quotation: { customer: true } },
        order: { createdAt: 'DESC' },
      }),
      this.quotationsRepository.find({
        where: { customer: { businessId: business.businessId } },
        relations: { customer: true },
        order: { createdAt: 'DESC' },
      }),
    ]);

    return [
      ...orders.map((order) => ({
        id: order.orderId,
        referenceCode: order.referenceCode,
        type: 'Pedido',
        title: `${order.referenceCode} · ${order.quotation.customer.firstNames}`,
        status: order.status,
        date: order.quotation.deliveryDate.toISOString(),
      })),
      ...quotations.map((quotation) => ({
        id: quotation.quotationId,
        referenceCode: quotation.referenceCode,
        type: 'Cotización',
        title: `${quotation.referenceCode} · ${quotation.customer.firstNames}`,
        status: quotation.orders?.length ? 'Aprobada' : 'Pendiente',
        date: quotation.deliveryDate.toISOString(),
      })),
    ].sort((left, right) => left.date.localeCompare(right.date));
  }
}
