import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './resources/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SchoolModule } from './resources/school/school.module';

@Module({
  imports: [PrismaModule, CqrsModule.forRoot(), SchoolModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
