import { Module } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { InteractionController } from './interaction.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'MENSAJERIA_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3003 },
      },
    ]),
  ],
  controllers: [InteractionController],
  providers: [InteractionService],
  exports: [InteractionService],
})
export class InteractionModule { }

