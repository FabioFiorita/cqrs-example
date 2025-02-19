import { TestingModule, Test } from '@nestjs/testing';
import { PrismaService } from 'src/resources/prisma/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { SchoolRepository } from './school.repository';

describe('SchoolRepository', () => {
  let repository: SchoolRepository;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    repository = module.get<SchoolRepository>(SchoolRepository);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all schools', async () => {
      const testSchools = [];
      prisma.school.findMany.mockResolvedValueOnce(testSchools);

      const result = await repository.getAll({
        whereClause: {},
        includeClause: undefined,
        orderByClause: undefined,
        skip: undefined,
        take: undefined,
      });

      expect(result).toBe(testSchools);
    });
  });

  describe('getFirst', () => {
    it('should return the first school', async () => {
      const testSchool = {
        id: 1,
        name: 'Test School',
        address: 'Test Address',
      };
      prisma.school.findFirst.mockResolvedValueOnce(testSchool);

      const result = await repository.getFirst({
        whereClause: { id: 1 },
        includeClause: undefined,
      });

      expect(result).toBe(testSchool);
    });
  });

  describe('create', () => {
    it('should create a school', async () => {
      const testSchool = {
        id: 1,
        name: 'Test School',
        address: 'Test Address',
      };
      prisma.school.create.mockResolvedValueOnce(testSchool);

      const result = await repository.create({
        data: { name: 'Test School', address: 'Test Address' },
      });

      expect(result).toBe(testSchool);
    });
  });

  describe('update', () => {
    it('should update a school', async () => {
      const testSchool = {
        id: 1,
        name: 'Updated School',
        address: 'Updated Address',
      };
      prisma.school.update.mockResolvedValueOnce(testSchool);

      const result = await repository.update({
        whereClause: { id: 1 },
        data: { name: 'Updated School', address: 'Updated Address' },
      });

      expect(result).toBe(testSchool);
    });
  });

  describe('delete', () => {
    it('should delete a school', async () => {
      const testSchool = {
        id: 1,
        name: 'Test School',
        address: 'Test Address',
      };
      prisma.school.delete.mockResolvedValueOnce(testSchool);

      const result = await repository.delete({
        whereClause: { id: 1 },
      });

      expect(result).toBe(testSchool);
    });
  });
});
