import { Prisma } from '@prisma/client';
import { UpdateSchoolDto } from '../dtos/update-school.dto';

export function mapUpdateSchoolDtoToPrisma(
  dto: UpdateSchoolDto,
): Prisma.SchoolUpdateInput {
  return {
    address: dto.newAddress,
  };
}
