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
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['localhost:4222'],
          user: 'nats-user',
          pass: 'nats-pass',
        },
      },
    ]),
  ],
  controllers: [AccountingController, PersonController],
  providers: [SnapshotResolver],
})
export class AppModule {}
