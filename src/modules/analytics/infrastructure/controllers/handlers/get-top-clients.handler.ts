import { Controller, Get, Query } from '@nestjs/common';
import { GetTopClientsUseCase } from '../../../application/use-cases/get-top-clients.use-case';
import { TopClientsQueryDto } from '../../../application/dtos/analytics-query.dto';

@Controller('analytics')
export class GetTopClientsHandler {
  constructor(private readonly useCase: GetTopClientsUseCase) {}

  @Get('top-clients')
  async execute(@Query() query: TopClientsQueryDto) {
    const result = await this.useCase.execute(query.limit ? Number(query.limit) : undefined);
    return {
      data: result,
      message: 'Top clientes devedores obtidos com sucesso.',
    };
  }
}
