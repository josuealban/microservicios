import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UsuariosModule } from './usuarios.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsuariosModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    },
  );

  await app.listen();
}

bootstrap();
