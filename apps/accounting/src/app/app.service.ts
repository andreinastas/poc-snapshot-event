import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AccountingDataDto } from './dto/accounting-data.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('accountingData.created');
    await this.kafkaClient.connect();
  }

  emitAccountingDataCreatedEvent(accountingData: AccountingDataDto) {
    const payload = plainToInstance(AccountingDataDto, accountingData, { exposeDefaultValues: true });

    const serializedPayload = JSON.stringify(payload);
    this.kafkaClient.emit('accountingData.created', serializedPayload);

    return {
      message: 'Accounting data emitted successfully',
      data: payload,
    };
  }
}
