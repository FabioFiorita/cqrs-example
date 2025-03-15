import { Test, TestingModule } from '@nestjs/testing';
import { GetSchoolHandler } from './get-school.handler';
import { GetSchoolQuery } from '../queries/get-school.query';
import { SchoolRepository } from '../repositories/school.repository';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { mapSchoolToDto } from '../mappers/map-prisma-school-to-dto.mapper';

jest.mock('../mappers/map-prisma-school-to-dto.mapper');

describe('GetSchoolHandler', () => {
  let handler: GetSchoolHandler;
  let repository: DeepMockProxy<SchoolRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSchoolHandler,
        {
          provide: SchoolRepository,
          useValue: mockDeep<SchoolRepository>(),
        },
      ],
    }).compile();

    handler = module.get<GetSchoolHandler>(GetSchoolHandler);
    repository = module.get<DeepMockProxy<SchoolRepository>>(SchoolRepository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    it('should retrieve the school successfully', async () => {
      const query = new GetSchoolQuery({ id: '1' });
      const school = {
        id: 1,
        name: 'Test School',
        address: 'Test Address',
        _count: {
          classes: 0,
          students: 0,
          teachers: 0,
        },
        classes: [],
        students: [],
        teachers: [],
      };
      const schoolDto = { id: 1, name: 'Test School', address: 'Test Address' };

      repository.getFirst.mockResolvedValueOnce(school);
      (mapSchoolToDto as jest.Mock).mockReturnValue(schoolDto);

      const result = await handler.execute(query);

      expect(repository.getFirst).toHaveBeenCalledWith({
        whereClause: { id: 1 },
      });
      expect(mapSchoolToDto).toHaveBeenCalledWith(school);
      expect(result).toEqual(schoolDto);
    });

    it('should throw an error if the school is not found', async () => {
      const query = new GetSchoolQuery({ id: '1' });

      repository.getFirst.mockResolvedValueOnce(null);

      await expect(handler.execute(query)).rejects.toThrow(
        'School with id 1 not found',
      );

      expect(repository.getFirst).toHaveBeenCalledWith({
        whereClause: { id: 1 },
      });
    });

    it('should throw an error if retrieving the school fails', async () => {
      const query = new GetSchoolQuery({ id: '1' });
      const error = new Error('Retrieve failed');

      repository.getFirst.mockRejectedValueOnce(error);

      await expect(handler.execute(query)).rejects.toThrow(error);

      expect(repository.getFirst).toHaveBeenCalledWith({
        whereClause: { id: 1 },
      });
    });
  });
});
