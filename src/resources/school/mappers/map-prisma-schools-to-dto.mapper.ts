import { School } from '@prisma/client';
import { SchoolsDto } from '../dtos/get-schools.dto';
import { mapSchoolToDto } from './map-prisma-school-to-dto.mapper';

export function mapSchoolsToDto(schools: School[]): SchoolsDto {
  return {
    schools: schools.map(mapSchoolToDto),
  };
}
