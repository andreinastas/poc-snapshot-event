import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PersonDataDto } from './dto/person-data.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('personData.created');
    await this.kafkaClient.connect();
  }

  emitPersonDataCreatedEvent(personData: PersonDataDto) {
    const payload = plainToInstance(PersonDataDto, personData, { exposeDefaultValues: true });
    
    const serializedPayload = JSON.stringify(payload);
    this.kafkaClient.emit('personData.created', serializedPayload);

    return {
      message: 'Person data emitted successfully',
      data: payload,
    };
  }
}
