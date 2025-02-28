import { Resolver, Subscription, Query, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { pubSub } from './util/pubsub';
import { SnapshotDataDto } from './dto/snapshot-data.dto';

@Injectable()
@Resolver(() => SnapshotDataDto)
export class SnapshotResolver {
  private snapshotStore = new Map<string, SnapshotDataDto>();

  @Query(() => String)
  hello() {
    return 'GraphQL API is working!';
  }

  @Subscription(() => SnapshotDataDto, {
    filter: (payload, variables) => payload.snapshotUpdated.householdId === variables.householdId,
    resolve: (payload) => {
      console.log('GraphQL Subscription received:', payload);
      return payload.snapshotUpdated;
    },
  })
  snapshotUpdated(@Args('householdId') householdId: string) {
    console.log(`Subscribed to snapshotUpdated event for householdId: ${householdId}`);

    const existingData = this.snapshotStore.get(householdId);
    
    if (existingData) {
     console.log('Returning stored snapshot immediately:', existingData);
     setTimeout(() => pubSub.publish('snapshotUpdated', { snapshotUpdated: existingData }), 0);
    }

    return pubSub.asyncIterableIterator('snapshotUpdated');
  }

  updateSnapshot(householdId: string, newData: Partial<SnapshotDataDto>) {
    const existingData = this.snapshotStore.get(householdId) || { householdId };
    const updatedData = { ...existingData, ...newData, timestamp: new Date().toISOString() };

    this.snapshotStore.set(householdId, updatedData);
    pubSub.publish('snapshotUpdated', { snapshotUpdated: updatedData });
    console.log('Published updated snapshot:', updatedData);
  }
}
