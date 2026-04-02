import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateReceivableUseCase } from '../create-receivable.use-case';

describe('CreateReceivableUseCase', () => {
  let useCase: CreateReceivableUseCase;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateReceivableUseCase,
        { provide: 'ReceivableRepositoryPort', useValue: mockRepository },
      ],
    }).compile();

    useCase = module.get<CreateReceivableUseCase>(CreateReceivableUseCase);
  });

  it('should create a receivable successfully', async () => {
    const dto = {
      clientId: 'client-uuid-123',
      value: 1500.0,
      description: 'Compra de materiais',
      validate: new Date('2025-06-15'),
      purchaseDate: new Date('2025-03-10'),
    };

    mockRepository.create.mockImplementation((receivable) => Promise.resolve(receivable));

    const result = await useCase.execute(dto);
    expect(result.clientId).toBe(dto.clientId);
    expect(result.value).toBe(dto.value);
    expect(result.description).toBe(dto.description);
    expect(result.paymentStatus).toBe('Pendente');
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw InternalServerErrorException on repository failure', async () => {
    const dto = {
      clientId: 'client-uuid-123',
      value: 1500.0,
      description: 'Compra de materiais',
      validate: new Date('2025-06-15'),
      purchaseDate: new Date('2025-03-10'),
    };

    mockRepository.create.mockRejectedValue(new Error('DB connection failed'));

    await expect(useCase.execute(dto)).rejects.toThrow(InternalServerErrorException);
  });
});
