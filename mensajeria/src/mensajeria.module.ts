import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { SubscriptionPlanModule } from './subscription/subscription-plan.module';

@Module({
  imports: [ChatModule, MessageModule, SubscriptionPlanModule],
})
export class MensajeriaModule {}

