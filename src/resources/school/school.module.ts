import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SchoolController } from './controllers/school.controller';
import { SchoolService } from './services/school.service';
import { SchoolRepository } from './repositories/school.repository';
import { GetSchoolHandler } from './handlers/get-school.handler';
import { CreateSchoolHandler } from './handlers/create-school.handler';
import { DeleteSchoolHandler } from './handlers/delete-school.handler';
import { GetSchoolsHandler } from './handlers/get-schools.handler';
import { UpdateSchoolHandler } from './handlers/update-school.handler';

const Services = [SchoolService];
const Repositories = [SchoolRepository];
const QueryHandlers = [GetSchoolHandler, GetSchoolsHandler];
const CommandHandlers = [
  CreateSchoolHandler,
  UpdateSchoolHandler,
  DeleteSchoolHandler,
];

@Module({
  imports: [PrismaModule],
  controllers: [SchoolController],
  providers: [
    ...Services,
    ...Repositories,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
})
export class SchoolModule {}
