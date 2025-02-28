import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class AccountingData {
  @Field()
  householdId: string;

  @Field()
  accountingData: string;

  @Field()
  timestamp: string;
}

@ObjectType()
class PersonData {
  @Field()
  householdId: string;

  @Field()
  personData: string;

  @Field()
  timestamp: string;
}

@ObjectType()
export class SnapshotDataDto {
  @Field()
  householdId: string;

  @Field(() => AccountingData, { nullable: true })
  accounting?: AccountingData;

  @Field(() => PersonData, { nullable: true })
  person?: PersonData;

  @Field()
  timestamp: string;
}
