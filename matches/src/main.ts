import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { MatchesModule } from './matches.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MatchesModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3002,
      },
    },
  );

  await app.listen();
}

void bootstrap();
