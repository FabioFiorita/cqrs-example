import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetSchoolsQuery } from '../queries/get-schools.query';
import { SchoolRepository } from '../repositories/school.repository';
import { Logger } from '@nestjs/common';
import { mapSchoolsToDto } from '../mappers/map-prisma-schools-to-dto.mapper';

@QueryHandler(GetSchoolsQuery)
export class GetSchoolsHandler implements IQueryHandler<GetSchoolsQuery> {
  private readonly logger = new Logger(GetSchoolsHandler.name);

  constructor(private readonly schoolRepository: SchoolRepository) {}

  async execute(query: GetSchoolsQuery) {
    const { limit, offset } = query.params;

    try {
      const schools = await this.schoolRepository.getAll({
        whereClause: {},
        skip: offset,
        take: limit,
      });

      this.logger.log(`Retrieved ${schools.length} schools successfully`);

      return mapSchoolsToDto(schools);
    } catch (error) {
      this.logger.error('Failed to retrieve schools', error.stack);
      throw error;
    }
  }
}
