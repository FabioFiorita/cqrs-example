import { Test, TestingModule } from '@nestjs/testing';
import { GetSchoolsHandler } from './get-schools.handler';
import { GetSchoolsQuery } from '../queries/get-schools.query';
import { SchoolRepository } from '../repositories/school.repository';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { mapSchoolsToDto } from '../mappers/map-prisma-schools-to-dto.mapper';

jest.mock('../mappers/map-prisma-schools-to-dto.mapper');

describe('GetSchoolsHandler', () => {
  let handler: GetSchoolsHandler;
  let repository: DeepMockProxy<SchoolRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSchoolsHandler,
        {
          provide: SchoolRepository,
          useValue: mockDeep<SchoolRepository>(),
        },
      ],
    }).compile();

    handler = module.get<GetSchoolsHandler>(GetSchoolsHandler);
    repository = module.get<DeepMockProxy<SchoolRepository>>(SchoolRepository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    it('should retrieve the schools successfully', async () => {
      const query = new GetSchoolsQuery({ limit: 10, offset: 0 });
      const schools = [
        {
          id: 1,
          name: 'School 1',
          address: 'Address 1',
          _count: {
            classes: 0,
            students: 0,
            teachers: 0,
          },
          classes: [],
          students: [],
          teachers: [],
        },
        {
          id: 2,
          name: 'School 2',
          address: 'Address 2',
          _count: {
            classes: 0,
            students: 0,
            teachers: 0,
          },
          classes: [],
          students: [],
          teachers: [],
        },
        {
          id: 3,
          name: 'School 2',
          address: 'Address 2',
          _count: {
            classes: 0,
            students: 0,
            teachers: 0,
          },
          classes: [],
          students: [],
          teachers: [],
        },
      ];
      const schoolsDto = {
        schools: [
          { id: 1, name: 'School 1', address: 'Address 1' },
          { id: 2, name: 'School 2', address: 'Address 2' },
        ],
      };

      repository.getAll.mockResolvedValueOnce(schools);
      (mapSchoolsToDto as jest.Mock).mockReturnValue(schoolsDto);

      const result = await handler.execute(query);

      expect(repository.getAll).toHaveBeenCalledWith({
        whereClause: {},
        skip: 0,
        take: 10,
      });
      expect(mapSchoolsToDto).toHaveBeenCalledWith(schools);
      expect(result).toEqual(schoolsDto);
    });

    it('should throw an error if retrieving the schools fails', async () => {
      const query = new GetSchoolsQuery({ limit: 10, offset: 0 });
      const error = new Error('Retrieve failed');

      repository.getAll.mockRejectedValueOnce(error);

      await expect(handler.execute(query)).rejects.toThrow(error);

      expect(repository.getAll).toHaveBeenCalledWith({
        whereClause: {},
        skip: 0,
        take: 10,
      });
    });
  });
});
