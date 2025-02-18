import { Injectable, ConflictException } from '@nestjs/common';
import { SchoolRepository } from '../repositories/school.repository';

@Injectable()
export class SchoolService {
  constructor(private readonly schoolRepository: SchoolRepository) {}

  async validateSchoolName(schoolName: string) {
    const existingSchool = await this.schoolRepository.getFirst({
      whereClause: { name: schoolName },
    });

    if (existingSchool) {
      throw new ConflictException('A school with this name already exists.');
    }
  }
}
