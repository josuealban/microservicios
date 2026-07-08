import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { SubscriptionPlanModule } from './subscription/subscription-plan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ChatModule, MessageModule, SubscriptionPlanModule],
})
export class MensajeriaModule {}

