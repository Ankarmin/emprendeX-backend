import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { FinanceService } from './finance.service';

@Controller({ path: 'contabilidad', version: '1' })
@UseGuards(JwtAuthGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('summary')
  getSummary(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.financeService.getSummary(currentUser.id);
  }

  @Get('records')
  listRecords(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.financeService.listRecords(currentUser.id);
  }

  @Get('payment-methods')
  listPaymentMethods() {
    return this.financeService.listPaymentMethods();
  }

  @Get('financial-categories')
  listFinancialCategories(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.financeService.listFinancialCategories(currentUser.id);
  }

  @Post('payments')
  createPayment(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.financeService.createPayment(currentUser.id, dto);
  }

  @Post('expenses')
  createExpense(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() dto: CreateExpenseDto,
  ) {
    return this.financeService.createExpense(currentUser.id, dto);
  }
}
