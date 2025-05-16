import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PersonDataDto } from './dto/person-data.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Person')
@Controller('person')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  @ApiOperation({ summary: 'Create a person data and emit a NATS event' })
  @ApiResponse({ status: 201, description: 'Person event emitted successfully' })
  createAccount(@Body() personData: PersonDataDto) {
    return this.appService.emitPersonDataCreatedEvent(personData);
  }
}
