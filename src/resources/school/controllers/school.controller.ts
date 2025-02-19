import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSchoolDto } from '../dtos/create-school.dto';
import { UpdateSchoolDto } from '../dtos/update-school.dto';
import { CreateSchoolCommand } from '../commands/create-school.command';
import { UpdateSchoolCommand } from '../commands/update-school.command';
import { DeleteSchoolCommand } from '../commands/delete-school.command';
import { GetSchoolQuery } from '../queries/get-school.query';
import { GetSchoolsQuery } from '../queries/get-schools.query';
import { SchoolDto } from '../dtos/get-school.dto';
import { SchoolsDto } from '../dtos/get-schools.dto';

@Controller('schools')
export class SchoolController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createSchool(
    @Body() createSchoolDto: CreateSchoolDto,
  ): Promise<SchoolDto> {
    const command = new CreateSchoolCommand({ createSchoolDto });
    return this.commandBus.execute(command);
  }

  @Put(':id')
  async updateSchool(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ): Promise<SchoolDto> {
    const command = new UpdateSchoolCommand({
      id: parseInt(id),
      updateSchoolDto,
    });
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  async deleteSchool(@Param('id') id: string): Promise<void> {
    const command = new DeleteSchoolCommand({ id: parseInt(id) });
    return this.commandBus.execute(command);
  }

  @Get(':id')
  async getSchool(@Param('id') id: string): Promise<SchoolDto> {
    const query = new GetSchoolQuery({ id });
    return this.queryBus.execute(query);
  }

  @Get()
  async getSchools(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<SchoolsDto> {
    const query = new GetSchoolsQuery({ limit, offset });
    return this.queryBus.execute(query);
  }
}
