import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { AllExceptionsFilter } from './filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}

bootstrap();