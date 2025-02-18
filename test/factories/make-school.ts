import { School } from '@prisma/client';

interface MakeSchoolProps {
  overrides: Partial<School>;
}

export function makeSchool({ overrides }: MakeSchoolProps): School {
  return {
    id: 1,
    name: 'Test School',
    address: 'Test Address',
    ...overrides,
  };
}
