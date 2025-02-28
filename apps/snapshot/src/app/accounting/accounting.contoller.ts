import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SnapshotResolver } from './../app.resolver';

@Controller()
export class AccountingController {
  constructor(private readonly snapshotResolver: SnapshotResolver) {}

  @EventPattern('accountingData.created')
  async handleAccountingEvent(@Payload() message: any) {
    console.log('Received Kafka Event from Accounting:', message);

    this.snapshotResolver.updateSnapshot(message.householdId, { accounting: message });
  }
}
