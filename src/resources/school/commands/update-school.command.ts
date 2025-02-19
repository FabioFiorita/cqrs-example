import { UpdateSchoolDto } from '../dtos/update-school.dto';

export class UpdateSchoolCommand {
  constructor(
    public readonly params: { id: number; updateSchoolDto: UpdateSchoolDto },
  ) {}
}
