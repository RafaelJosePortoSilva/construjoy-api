import { Controller, Get } from '@nestjs/common';
import { GetReceivablesByStatusUseCase } from '../../../application/use-cases/get-receivables-by-status.use-case';

@Controller('analytics')
export class GetReceivablesByStatusHandler {
  constructor(private readonly useCase: GetReceivablesByStatusUseCase) {}

  @Get('receivables-by-status')
  async execute() {
    const result = await this.useCase.execute();
    return {
      data: result,
      message: 'Distribuição por status obtida com sucesso.',
    };
  }
}
