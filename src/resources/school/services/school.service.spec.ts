import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './school.service';
import { SchoolRepository } from '../repositories/school.repository';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { ConflictException } from '@nestjs/common';

describe('SchoolService', () => {
  let service: SchoolService;
  let repository: DeepMockProxy<SchoolRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolService,
        {
          provide: SchoolRepository,
          useValue: mockDeep<SchoolRepository>(),
        },
      ],
    }).compile();

    service = module.get<SchoolService>(SchoolService);
    repository = module.get<DeepMockProxy<SchoolRepository>>(SchoolRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateSchoolName', () => {
    it('should throw ConflictException if school name already exists', async () => {
      const schoolName = 'Existing School';
      repository.getFirst.mockResolvedValueOnce({
        id: 1,
        name: schoolName,
        address: 'Test Address',
        classes: [],
        students: [],
        teachers: [],
        _count: {
          classes: 0,
          students: 0,
          teachers: 0,
        },
      });

      await expect(service.validateSchoolName(schoolName)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should not throw if school name does not exist', async () => {
      const schoolName = 'New School';
      repository.getFirst.mockResolvedValueOnce(null);

      await expect(
        service.validateSchoolName(schoolName),
      ).resolves.not.toThrow();
    });
  });
});
