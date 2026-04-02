import { Test, TestingModule } from '@nestjs/testing';
import { GetFinancialSummaryUseCase } from '../get-financial-summary.use-case';
import { PrismaAnalyticsRepository } from '../../../infrastructure/adapters/database/repositories/prisma-analytics.repository';

describe('GetFinancialSummaryUseCase', () => {
  let useCase: GetFinancialSummaryUseCase;
  let repository: jest.Mocked<PrismaAnalyticsRepository>;

  beforeEach(async () => {
    const mockRepository = {
      getFinancialSummary: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetFinancialSummaryUseCase,
        { provide: PrismaAnalyticsRepository, useValue: mockRepository },
      ],
    }).compile();

    useCase = module.get<GetFinancialSummaryUseCase>(GetFinancialSummaryUseCase);
    repository = module.get(PrismaAnalyticsRepository);
  });

  it('should return financial summary', async () => {
    const mockSummary = {
      totalReceivables: 10000,
      totalPaid: 6000,
      totalPending: 2500,
      totalOverdue: 1500,
      totalCount: 20,
      collectionRate: 60,
    };

    repository.getFinancialSummary.mockResolvedValue(mockSummary);

    const result = await useCase.execute();
    expect(result).toEqual(mockSummary);
    expect(repository.getFinancialSummary).toHaveBeenCalledWith(undefined, undefined);
  });

  it('should pass date filters to repository', async () => {
    const mockSummary = {
      totalReceivables: 5000,
      totalPaid: 3000,
      totalPending: 1200,
      totalOverdue: 800,
      totalCount: 10,
      collectionRate: 60,
    };

    repository.getFinancialSummary.mockResolvedValue(mockSummary);

    const result = await useCase.execute('2025-01-01', '2025-12-31');
    expect(result).toEqual(mockSummary);
    expect(repository.getFinancialSummary).toHaveBeenCalledWith('2025-01-01', '2025-12-31');
  });
});
