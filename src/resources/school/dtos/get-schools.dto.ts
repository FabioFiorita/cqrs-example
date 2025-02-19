import { SchoolDto } from './get-school.dto';

export class SchoolsDto {
  schools: SchoolDto[];

  constructor(schools: SchoolDto[]) {
    this.schools = schools;
  }
}
