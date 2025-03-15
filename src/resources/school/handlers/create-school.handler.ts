import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSchoolCommand } from '../commands/create-school.command';
import { SchoolRepository } from '../repositories/school.repository';
import { mapCreateSchoolDtoToPrisma } from '../mappers/map-create-school-dto-to-prisma.mapper';
import { SchoolService } from '../services/school.service';
import { Logger } from '@nestjs/common';
import { mapSchoolToDto } from '../mappers/map-prisma-school-to-dto.mapper';

@CommandHandler(CreateSchoolCommand)
export class CreateSchoolHandler
  implements ICommandHandler<CreateSchoolCommand>
{
  private readonly logger = new Logger(CreateSchoolHandler.name);

  constructor(
    private readonly schoolRepository: SchoolRepository,
    private readonly schoolService: SchoolService,
  ) {}

  async execute(command: CreateSchoolCommand) {
    const { createSchoolDto } = command.params;

    try {
      // Check if the school name is already taken
      await this.schoolService.validateSchoolName(createSchoolDto.schoolName);

      // Map the DTO to Prisma format
      const schoolData = mapCreateSchoolDtoToPrisma(createSchoolDto);

      // Create the school
      const createdSchool = await this.schoolRepository.create({
        data: schoolData,
      });

      this.logger.log('School created successfully');

      return mapSchoolToDto(createdSchool);
    } catch (error) {
      this.logger.error('Failed to create school', error.stack);
      throw error;
    }
  }
}
