import { mapCreateSchoolDtoToPrisma } from './map-create-school-dto-to-prisma.mapper';
import { CreateSchoolDto } from '../dtos/create-school.dto';
import { Prisma } from '@prisma/client';

describe('mapCreateSchoolDtoToPrisma', () => {
  it('should map CreateSchoolDto to Prisma.SchoolCreateInput', () => {
    const dto: CreateSchoolDto = {
      schoolName: 'Test School',
      schoolAddress: 'Test Address',
    };
    const expected: Prisma.SchoolCreateInput = {
      name: 'Test School',
      address: 'Test Address',
    };

    const result = mapCreateSchoolDtoToPrisma(dto);

    expect(result).toEqual(expected);
  });
});
