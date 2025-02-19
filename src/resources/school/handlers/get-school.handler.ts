import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetSchoolQuery } from '../queries/get-school.query';
import { SchoolRepository } from '../repositories/school.repository';
import { Logger } from '@nestjs/common';
import { mapSchoolToDto } from '../mappers/map-prisma-school-to-dto.mapper';

@QueryHandler(GetSchoolQuery)
export class GetSchoolHandler implements IQueryHandler<GetSchoolQuery> {
  private readonly logger = new Logger(GetSchoolHandler.name);

  constructor(private readonly schoolRepository: SchoolRepository) {}

  async execute(query: GetSchoolQuery) {
    const { id } = query.params;

    try {
      const school = await this.schoolRepository.getFirst({
        whereClause: { id: parseInt(id) },
      });

      if (!school) {
        this.logger.warn(`School with id ${id} not found`);
        throw new Error(`School with id ${id} not found`);
      }

      this.logger.log(`School with id ${id} retrieved successfully`);

      return mapSchoolToDto(school);
    } catch (error) {
      this.logger.error('Failed to retrieve school', error.stack);
      throw error;
    }
  }
}
