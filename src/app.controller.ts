import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  checkHealth(): string {
    return 'Hello World!';
  }
}
