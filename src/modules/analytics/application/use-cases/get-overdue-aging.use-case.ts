import { Injectable } from '@nestjs/common';
import { PrismaAnalyticsRepository } from '../../infrastructure/adapters/database/repositories/prisma-analytics.repository';

@Injectable()
export class GetOverdueAgingUseCase {
  constructor(private readonly analyticsRepository: PrismaAnalyticsRepository) {}

  async execute() {
    return this.analyticsRepository.getOverdueAging();
  }
}
