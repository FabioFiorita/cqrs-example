import { Test, TestingModule } from '@nestjs/testing';
import { CreateSchoolHandler } from './create-school.handler';
import { CreateSchoolCommand } from '../commands/create-school.command';
import { SchoolRepository } from '../repositories/school.repository';
import { SchoolService } from '../services/school.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { mapCreateSchoolDtoToPrisma } from '../mappers/map-create-school-dto-to-prisma.mapper';
import { mapSchoolToDto } from '../mappers/map-prisma-school-to-dto.mapper';

jest.mock('../mappers/map-create-school-dto-to-prisma.mapper');
jest.mock('../mappers/map-prisma-school-to-dto.mapper');

describe('CreateSchoolHandler', () => {
  let handler: CreateSchoolHandler;
  let repository: DeepMockProxy<SchoolRepository>;
  let service: DeepMockProxy<SchoolService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSchoolHandler,
        {
          provide: SchoolRepository,
          useValue: mockDeep<SchoolRepository>(),
        },
        {
          provide: SchoolService,
          useValue: mockDeep<SchoolService>(),
        },
      ],
    }).compile();

    handler = module.get<CreateSchoolHandler>(CreateSchoolHandler);
    repository = module.get<DeepMockProxy<SchoolRepository>>(SchoolRepository);
    service = module.get<DeepMockProxy<SchoolService>>(SchoolService);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    it('should create the school successfully', async () => {
      const command = new CreateSchoolCommand({
        createSchoolDto: {
          schoolName: 'Test School',
          schoolAddress: 'Test Address',
        },
      });
      const schoolData = { name: 'Test School', address: 'Test Address' };
      const createdSchool = {
        id: 1,
        name: 'Test School',
        address: 'Test Address',
      };
      const schoolDto = { id: 1, name: 'Test School', address: 'Test Address' };

      (mapCreateSchoolDtoToPrisma as jest.Mock).mockReturnValue(schoolData);
      service.validateSchoolName.mockResolvedValueOnce(null);
      repository.create.mockResolvedValueOnce(createdSchool);
      (mapSchoolToDto as jest.Mock).mockReturnValue(schoolDto);

      const result = await handler.execute(command);

      expect(service.validateSchoolName).toHaveBeenCalledWith(
        command.params.createSchoolDto.schoolName,
      );
      expect(mapCreateSchoolDtoToPrisma).toHaveBeenCalledWith(
        command.params.createSchoolDto,
      );
      expect(repository.create).toHaveBeenCalledWith({ data: schoolData });
      expect(mapSchoolToDto).toHaveBeenCalledWith(createdSchool);
      expect(result).toEqual(schoolDto);
    });

    it('should throw an error if creating the school fails', async () => {
      const command = new CreateSchoolCommand({
        createSchoolDto: {
          schoolName: 'Test School',
          schoolAddress: 'Test Address',
        },
      });
      const schoolData = { name: 'Test School', address: 'Test Address' };
      const error = new Error('Create failed');

      (mapCreateSchoolDtoToPrisma as jest.Mock).mockReturnValue(schoolData);
      service.validateSchoolName.mockResolvedValueOnce(null);
      repository.create.mockRejectedValueOnce(error);

      await expect(handler.execute(command)).rejects.toThrow(error);

      expect(service.validateSchoolName).toHaveBeenCalledWith(
        command.params.createSchoolDto.schoolName,
      );
      expect(mapCreateSchoolDtoToPrisma).toHaveBeenCalledWith(
        command.params.createSchoolDto,
      );
      expect(repository.create).toHaveBeenCalledWith({ data: schoolData });
    });
  });
});
