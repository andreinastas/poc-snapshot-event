import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountingDataDto } from './dto/accounting-data.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Accounting')
@Controller('accounting')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiOperation({ summary: 'Create an accounting data and emit a NATS event' })
  @ApiResponse({ status: 201, description: 'Accounting data event emitted successfully' })
  createAccount(@Body() accountingData: AccountingDataDto) {
    return this.appService.emitAccountingDataCreatedEvent(accountingData);
  }
}
