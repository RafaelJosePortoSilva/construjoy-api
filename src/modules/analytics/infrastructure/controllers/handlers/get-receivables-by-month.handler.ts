import { Controller, Get, Query } from '@nestjs/common';
import { GetReceivablesByMonthUseCase } from '../../../application/use-cases/get-receivables-by-month.use-case';
import { AnalyticsQueryDto } from '../../../application/dtos/analytics-query.dto';

@Controller('analytics')
export class GetReceivablesByMonthHandler {
  constructor(private readonly useCase: GetReceivablesByMonthUseCase) {}

  @Get('receivables-by-month')
  async execute(@Query() query: AnalyticsQueryDto) {
    const result = await this.useCase.execute(query.startDate, query.endDate);
    return {
      data: result,
      message: 'Recebíveis por mês obtidos com sucesso.',
    };
  }
}
