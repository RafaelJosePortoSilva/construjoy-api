import { Controller, Get, Query } from '@nestjs/common';
import { GetMonthlyRevenueUseCase } from '../../../application/use-cases/get-monthly-revenue.use-case';
import { AnalyticsQueryDto } from '../../../application/dtos/analytics-query.dto';

@Controller('analytics')
export class GetMonthlyRevenueHandler {
  constructor(private readonly useCase: GetMonthlyRevenueUseCase) {}

  @Get('monthly-revenue')
  async execute(@Query() query: AnalyticsQueryDto) {
    const result = await this.useCase.execute(query.startDate, query.endDate);
    return {
      data: result,
      message: 'Receita mensal obtida com sucesso.',
    };
  }
}
