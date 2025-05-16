import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { PersonDataDto } from './dto/person-data.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientNats
  ) {}

  async onModuleInit() {
    await this.natsClient.connect();
  }

  emitPersonDataCreatedEvent(personData: PersonDataDto) {
    const payload = plainToInstance(PersonDataDto, personData, { exposeDefaultValues: true });
    
    const serializedPayload = JSON.stringify(payload);
    this.natsClient.emit('personData.created', serializedPayload);

    return {
      message: 'Person data emitted successfully',
      data: payload,
    };
  }
}
