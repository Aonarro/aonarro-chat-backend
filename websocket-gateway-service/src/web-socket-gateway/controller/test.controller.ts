import { Controller, Get } from '@nestjs/common';

@Controller('chat')
export class testController {
  constructor() {}

  @Get()
  async testEndpoint() {
    return 'hello test';
  }
}
