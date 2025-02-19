import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSchoolCommand } from '../commands/delete-school.command';
import { SchoolRepository } from '../repositories/school.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(DeleteSchoolCommand)
export class DeleteSchoolHandler
  implements ICommandHandler<DeleteSchoolCommand>
{
  private readonly logger = new Logger(DeleteSchoolHandler.name);

  constructor(private readonly schoolRepository: SchoolRepository) {}

  async execute(command: DeleteSchoolCommand) {
    const { id } = command.params;

    try {
      // Delete the school
      await this.schoolRepository.delete({
        whereClause: { id },
      });

      this.logger.log('School deleted successfully');
    } catch (error) {
      this.logger.error('Failed to delete school', error.stack);
      throw error;
    }
  }
}
