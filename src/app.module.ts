import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './resources/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [PrismaModule, CqrsModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
