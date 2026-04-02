import { Injectable } from '@nestjs/common';
import { PrismaAnalyticsRepository } from '../../infrastructure/adapters/database/repositories/prisma-analytics.repository';

@Injectable()
export class GetTopClientsUseCase {
  constructor(private readonly analyticsRepository: PrismaAnalyticsRepository) {}

  async execute(limit?: number) {
    return this.analyticsRepository.getTopClients(limit || 10);
  }
}
