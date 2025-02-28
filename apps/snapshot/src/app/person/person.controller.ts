import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SnapshotResolver } from './../app.resolver';

@Controller()
export class PersonController {
  constructor(private readonly snapshotResolver: SnapshotResolver) {}

  @EventPattern('personData.created')
  async handlePersonEvent(@Payload() message: any) {
    console.log('Received Kafka Event from Person:', message);

    this.snapshotResolver.updateSnapshot(message.householdId, { person: message });
  }
}
