import { Injectable } from '@nestjs/common';
import { PrismaAnalyticsRepository } from '../../infrastructure/adapters/database/repositories/prisma-analytics.repository';

@Injectable()
export class GetMonthlyRevenueUseCase {
  constructor(private readonly analyticsRepository: PrismaAnalyticsRepository) {}

  async execute(startDate?: string, endDate?: string) {
    return this.analyticsRepository.getMonthlyRevenue(startDate, endDate);
  }
}
