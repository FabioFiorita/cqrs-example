import { CreateSchoolDto } from '../dtos/create-school.dto';
import { Prisma } from '@prisma/client';

export function mapCreateSchoolDtoToPrisma(
  data: CreateSchoolDto,
): Prisma.SchoolCreateInput {
  return {
    name: data.schoolName,
    address: data.schoolAddress,
  };
}
