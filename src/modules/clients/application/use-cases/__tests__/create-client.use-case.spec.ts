import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateClientUseCase } from '../create-client.use-case';

describe('CreateClientUseCase', () => {
  let useCase: CreateClientUseCase;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClientUseCase,
        { provide: 'ClientRepositoryPort', useValue: mockRepository },
      ],
    }).compile();

    useCase = module.get<CreateClientUseCase>(CreateClientUseCase);
  });

  it('should create a client successfully', async () => {
    const dto = {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      document: '123.456.789-00',
    };

    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.create.mockImplementation((client) => Promise.resolve(client));

    const result = await useCase.execute(dto);
    expect(result.name).toBe(dto.name);
    expect(result.email).toBe(dto.email);
    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw ConflictException when client with same email exists', async () => {
    const dto = {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      document: '123.456.789-00',
    };

    mockRepository.findOne.mockResolvedValue({ id: 'existing-id', ...dto });

    await expect(useCase.execute(dto)).rejects.toThrow(ConflictException);
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
