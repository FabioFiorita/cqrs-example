import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSchoolCommand } from '../commands/update-school.command';
import { SchoolRepository } from '../repositories/school.repository';
import { Logger } from '@nestjs/common';
import { mapUpdateSchoolDtoToPrisma } from '../mappers/map-update-school-dto-to-prisma.mapper';

@CommandHandler(UpdateSchoolCommand)
export class UpdateSchoolHandler
  implements ICommandHandler<UpdateSchoolCommand>
{
  private readonly logger = new Logger(UpdateSchoolHandler.name);

  constructor(private readonly schoolRepository: SchoolRepository) {}

  async execute(command: UpdateSchoolCommand) {
    const { id, updateSchoolDto } = command.params;

    try {
      // Map the DTO to Prisma format
      const schoolData = mapUpdateSchoolDtoToPrisma(updateSchoolDto);

      // Update the school
      await this.schoolRepository.update({
        data: schoolData,
        whereClause: { id },
      });

      this.logger.log('School updated successfully');
    } catch (error) {
      this.logger.error('Failed to update school', error.stack);
      throw error;
    }
  }
}
