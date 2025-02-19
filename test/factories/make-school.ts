import { School } from '@prisma/client';

interface MakeSchoolProps {
  overrides: Partial<School>;
}

export function makeSchool({ overrides }: MakeSchoolProps): School {
  const school: School = {
    id: 1,
    name: 'Test School',
    address: 'Test Address',
    ...overrides,
  };

  return school;
}
