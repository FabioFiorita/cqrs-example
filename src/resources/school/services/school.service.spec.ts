import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './school.service';
import { SchoolRepository } from '../repositories/school.repository';
import { ConflictException } from '@nestjs/common';
import { makeSchool } from '../../../../test/factories/make-school';

describe('SchoolService', () => {
  let service: SchoolService;
  let repository: SchoolRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolService,
        {
          provide: SchoolRepository,
          useValue: {
            getFirst: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SchoolService>(SchoolService);
    repository = module.get<SchoolRepository>(SchoolRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateSchoolName', () => {
    it('should throw ConflictException if school name already exists', async () => {
      const schoolName = 'Existing School';
      const existingSchool = makeSchool({
        overrides: {
          name: schoolName,
        },
      });
      jest.spyOn(repository, 'getFirst').mockResolvedValueOnce(existingSchool);

      await expect(service.validateSchoolName(schoolName)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should not throw if school name does not exist', async () => {
      const schoolName = 'New School';
      jest.spyOn(repository, 'getFirst').mockResolvedValueOnce(null);

      await expect(
        service.validateSchoolName(schoolName),
      ).resolves.not.toThrow();
    });
  });
});
