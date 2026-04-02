import { Test, TestingModule } from '@nestjs/testing';
import { GetReceivablesByStatusUseCase } from '../get-receivables-by-status.use-case';
import { PrismaAnalyticsRepository } from '../../../infrastructure/adapters/database/repositories/prisma-analytics.repository';

describe('GetReceivablesByStatusUseCase', () => {
  let useCase: GetReceivablesByStatusUseCase;
  let repository: jest.Mocked<PrismaAnalyticsRepository>;

  beforeEach(async () => {
    const mockRepository = {
      getReceivablesByStatus: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetReceivablesByStatusUseCase,
        { provide: PrismaAnalyticsRepository, useValue: mockRepository },
      ],
    }).compile();

    useCase = module.get<GetReceivablesByStatusUseCase>(GetReceivablesByStatusUseCase);
    repository = module.get(PrismaAnalyticsRepository);
  });

  it('should return receivables grouped by status', async () => {
    const mockData = [
      { status: 'Pago', total: 6000, count: 12 },
      { status: 'Pendente', total: 2500, count: 5 },
      { status: 'Atrasado', total: 1500, count: 3 },
    ];

    repository.getReceivablesByStatus.mockResolvedValue(mockData);

    const result = await useCase.execute();
    expect(result).toEqual(mockData);
    expect(result).toHaveLength(3);
    expect(repository.getReceivablesByStatus).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no data exists', async () => {
    repository.getReceivablesByStatus.mockResolvedValue([]);

    const result = await useCase.execute();
    expect(result).toEqual([]);
  });
});
