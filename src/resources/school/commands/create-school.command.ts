import { CreateSchoolDto } from '../dtos/create-school.dto';

export class CreateSchoolCommand {
  constructor(public readonly params: { createSchoolDto: CreateSchoolDto }) {}
}
