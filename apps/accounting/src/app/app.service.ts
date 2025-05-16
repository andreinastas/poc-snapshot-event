import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { AccountingDataDto } from './dto/accounting-data.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientNats
  ) {}

  async onModuleInit() {
    await this.natsClient.connect();
  }

  emitAccountingDataCreatedEvent(accountingData: AccountingDataDto) {
    const payload = plainToInstance(AccountingDataDto, accountingData, { exposeDefaultValues: true });

    const serializedPayload = JSON.stringify(payload);
    this.natsClient.emit('accountingData.created', serializedPayload);

    return {
      message: 'Accounting data emitted successfully',
      data: payload,
    };
  }
}
