import { Test, TestingModule } from '@nestjs/testing';
import { GetTopClientsUseCase } from '../get-top-clients.use-case';
import { PrismaAnalyticsRepository } from '../../../infrastructure/adapters/database/repositories/prisma-analytics.repository';

describe('GetTopClientsUseCase', () => {
  let useCase: GetTopClientsUseCase;
  let repository: jest.Mocked<PrismaAnalyticsRepository>;

  beforeEach(async () => {
    const mockRepository = {
      getTopClients: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTopClientsUseCase,
        { provide: PrismaAnalyticsRepository, useValue: mockRepository },
      ],
    }).compile();

    useCase = module.get<GetTopClientsUseCase>(GetTopClientsUseCase);
    repository = module.get(PrismaAnalyticsRepository);
  });

  it('should return top clients with default limit of 10', async () => {
    const mockClients = [
      { id: '1', name: 'Cliente A', document: '111.111.111-11', totalDebt: 5000, overdueCount: 2, pendingCount: 3 },
      { id: '2', name: 'Cliente B', document: '222.222.222-22', totalDebt: 3000, overdueCount: 1, pendingCount: 2 },
    ];

    repository.getTopClients.mockResolvedValue(mockClients);

    const result = await useCase.execute();
    expect(result).toEqual(mockClients);
    expect(repository.getTopClients).toHaveBeenCalledWith(10);
  });

  it('should pass custom limit to repository', async () => {
    repository.getTopClients.mockResolvedValue([]);

    await useCase.execute(5);
    expect(repository.getTopClients).toHaveBeenCalledWith(5);
  });

  it('should return clients sorted by debt descending', async () => {
    const mockClients = [
      { id: '1', name: 'Maior Devedor', document: '111.111.111-11', totalDebt: 10000, overdueCount: 5, pendingCount: 3 },
      { id: '2', name: 'Segundo Devedor', document: '222.222.222-22', totalDebt: 5000, overdueCount: 2, pendingCount: 1 },
    ];

    repository.getTopClients.mockResolvedValue(mockClients);

    const result = await useCase.execute();
    expect(result[0].totalDebt).toBeGreaterThan(result[1].totalDebt);
  });
});
