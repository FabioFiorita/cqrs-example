import { mapUpdateSchoolDtoToPrisma } from './map-update-school-dto-to-prisma.mapper';
import { UpdateSchoolDto } from '../dtos/update-school.dto';
import { Prisma } from '@prisma/client';

describe('mapUpdateSchoolDtoToPrisma', () => {
  it('should map UpdateSchoolDto to Prisma.SchoolUpdateInput', () => {
    const dto: UpdateSchoolDto = { newAddress: '123 New Address' };
    const expected: Prisma.SchoolUpdateInput = { address: '123 New Address' };

    const result = mapUpdateSchoolDtoToPrisma(dto);

    expect(result).toEqual(expected);
  });
});
