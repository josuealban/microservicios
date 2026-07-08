import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { MensajeriaModule } from './mensajeria.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MensajeriaModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3003,
      },
    },
  );

  await app.listen();
}

bootstrap();

