import { Test, TestingModule } from '@nestjs/testing';
import { DeleteSchoolHandler } from './delete-school.handler';
import { DeleteSchoolCommand } from '../commands/delete-school.command';
import { SchoolRepository } from '../repositories/school.repository';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('DeleteSchoolHandler', () => {
  let handler: DeleteSchoolHandler;
  let repository: DeepMockProxy<SchoolRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteSchoolHandler,
        {
          provide: SchoolRepository,
          useValue: mockDeep<SchoolRepository>(),
        },
      ],
    }).compile();

    handler = module.get<DeleteSchoolHandler>(DeleteSchoolHandler);
    repository = module.get<DeepMockProxy<SchoolRepository>>(SchoolRepository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    it('should delete the school successfully', async () => {
      const command = new DeleteSchoolCommand({ id: 1 });

      repository.delete.mockResolvedValueOnce(null);

      await handler.execute(command);

      expect(repository.delete).toHaveBeenCalledWith({
        whereClause: { id: 1 },
      });
    });

    it('should throw an error if deleting the school fails', async () => {
      const command = new DeleteSchoolCommand({ id: 1 });
      const error = new Error('Delete failed');

      repository.delete.mockRejectedValueOnce(error);

      await expect(handler.execute(command)).rejects.toThrow(error);

      expect(repository.delete).toHaveBeenCalledWith({
        whereClause: { id: 1 },
      });
    });
  });
});
