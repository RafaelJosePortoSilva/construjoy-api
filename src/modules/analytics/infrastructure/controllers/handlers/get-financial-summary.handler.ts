import { Controller, Get, Query } from '@nestjs/common';
import { GetFinancialSummaryUseCase } from '../../../application/use-cases/get-financial-summary.use-case';
import { AnalyticsQueryDto } from '../../../application/dtos/analytics-query.dto';

@Controller('analytics')
export class GetFinancialSummaryHandler {
  constructor(private readonly useCase: GetFinancialSummaryUseCase) {}

  @Get('summary')
  async execute(@Query() query: AnalyticsQueryDto) {
    const result = await this.useCase.execute(query.startDate, query.endDate);
    return {
      data: result,
      message: 'Resumo financeiro obtido com sucesso.',
    };
  }
}
