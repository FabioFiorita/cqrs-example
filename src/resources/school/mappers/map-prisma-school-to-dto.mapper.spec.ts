import { mapSchoolToDto } from './map-prisma-school-to-dto.mapper';
import { School } from '@prisma/client';
import { SchoolDto } from '../dtos/get-school.dto';

describe('mapSchoolToDto', () => {
  it('should map a School object to SchoolDto', () => {
    const school: School = {
      id: 1,
      name: 'Test School',
      address: 'Test Address',
    };

    const expected: SchoolDto = {
      id: 1,
      name: 'Test School',
      address: 'Test Address',
    };

    const result = mapSchoolToDto(school);

    expect(result).toEqual(expected);
  });
});
