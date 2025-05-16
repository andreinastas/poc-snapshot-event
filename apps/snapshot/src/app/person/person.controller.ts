import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SnapshotResolver } from './../app.resolver';

@Controller()
export class PersonController {
  constructor(private readonly snapshotResolver: SnapshotResolver) {}

  @EventPattern('personData.created')
  async handlePersonEvent(@Payload() message: any) {
    console.log('Received NATS Event from Person:', message);
    const data = JSON.parse(message);
    this.snapshotResolver.updateSnapshot(data.householdId, { person: data });
  }
}
