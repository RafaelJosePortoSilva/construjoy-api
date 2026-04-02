import { Controller, Get } from '@nestjs/common';
import { GetOverdueAgingUseCase } from '../../../application/use-cases/get-overdue-aging.use-case';

@Controller('analytics')
export class GetOverdueAgingHandler {
  constructor(private readonly useCase: GetOverdueAgingUseCase) {}

  @Get('overdue-aging')
  async execute() {
    const result = await this.useCase.execute();
    return {
      data: result,
      message: 'Análise de aging de inadimplência obtida com sucesso.',
    };
  }
}
