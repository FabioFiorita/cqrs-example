import { Test, TestingModule } from '@nestjs/testing';
import { UpdateSchoolHandler } from './update-school.handler';
import { UpdateSchoolCommand } from '../commands/update-school.command';
import { SchoolRepository } from '../repositories/school.repository';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { mapUpdateSchoolDtoToPrisma } from '../mappers/map-update-school-dto-to-prisma.mapper';

jest.mock('../mappers/map-update-school-dto-to-prisma.mapper');

describe('UpdateSchoolHandler', () => {
  let handler: UpdateSchoolHandler;
  let repository: DeepMockProxy<SchoolRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateSchoolHandler,
        {
          provide: SchoolRepository,
          useValue: mockDeep<SchoolRepository>(),
        },
      ],
    }).compile();

    handler = module.get<UpdateSchoolHandler>(UpdateSchoolHandler);
    repository = module.get<DeepMockProxy<SchoolRepository>>(SchoolRepository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    it('should update the school successfully', async () => {
      const command = new UpdateSchoolCommand({
        id: 1,
        updateSchoolDto: { newAddress: '123 New Address' },
      });
      const schoolData = { address: '123 New Address' };

      (mapUpdateSchoolDtoToPrisma as jest.Mock).mockReturnValue(schoolData);
      repository.update.mockResolvedValueOnce(null);

      await handler.execute(command);

      expect(mapUpdateSchoolDtoToPrisma).toHaveBeenCalledWith(
        command.params.updateSchoolDto,
      );
      expect(repository.update).toHaveBeenCalledWith({
        data: schoolData,
        whereClause: { id: 1 },
      });
    });

    it('should log an error if updating the school fails', async () => {
      const command = new UpdateSchoolCommand({
        id: 1,
        updateSchoolDto: { newAddress: '123 New Address' },
      });
      const schoolData = { address: '123 New Address' };
      const error = new Error('Update failed');

      (mapUpdateSchoolDtoToPrisma as jest.Mock).mockReturnValue(schoolData);
      repository.update.mockRejectedValueOnce(error);

      await expect(handler.execute(command)).rejects.toThrow(error);

      expect(mapUpdateSchoolDtoToPrisma).toHaveBeenCalledWith(
        command.params.updateSchoolDto,
      );
      expect(repository.update).toHaveBeenCalledWith({
        data: schoolData,
        whereClause: { id: 1 },
      });
    });
  });
});
