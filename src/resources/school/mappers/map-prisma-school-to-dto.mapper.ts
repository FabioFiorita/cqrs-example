import { School } from '@prisma/client';
import { SchoolDto } from '../dtos/get-school.dto';

export function mapSchoolToDto(school: School): SchoolDto {
  return {
    id: school.id,
    name: school.name,
    address: school.address,
  };
}
