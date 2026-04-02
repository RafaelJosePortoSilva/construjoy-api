import { Injectable } from '@nestjs/common';
import { PrismaAnalyticsRepository } from '../../infrastructure/adapters/database/repositories/prisma-analytics.repository';

@Injectable()
export class GetReceivablesByMonthUseCase {
  constructor(private readonly analyticsRepository: PrismaAnalyticsRepository) {}

  async execute(startDate?: string, endDate?: string) {
    return this.analyticsRepository.getReceivablesByMonth(startDate, endDate);
  }
}
