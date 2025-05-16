import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SnapshotResolver } from './../app.resolver';

@Controller()
export class AccountingController {
  constructor(private readonly snapshotResolver: SnapshotResolver) {}

  @EventPattern('accountingData.created')
  async handleAccountingEvent(@Payload() message: any) {
    console.log('Received NATS Event from Accounting:', message);
    
    const data = JSON.parse(message);
    
    this.snapshotResolver.updateSnapshot(data.householdId, { accounting: data });
  }
}
