import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { SnapshotResolver } from './app.resolver';
import { AccountingController } from './accounting/accounting.contoller';
import { PersonController } from './person/person.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/snapshot/schema.gql'),
      installSubscriptionHandlers: true,
    }),

    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'snapshot',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'snapshot',
          },
        },
      },
    ]),
  ],
  controllers: [AccountingController, PersonController],
  providers: [SnapshotResolver],
})
export class AppModule {}
