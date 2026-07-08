import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubscriptionService } from './subscription.service';
import { USER_PATTERNS } from '../common/patterns';
import { SubscriptionTier } from '../domain/enums/subscription-tier.enum';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @MessagePattern(USER_PATTERNS.CREATE_SUBSCRIPTION)
  updateSubscription(@Payload() data: { userId: number, tier: SubscriptionTier }) {
    return this.subscriptionService.updateSubscription(data.userId, data.tier);
  }

  @MessagePattern(USER_PATTERNS.FIND_SUBSCRIPTION_BY_USER)
  findSubscriptionByUser(@Payload() data: { userId: number }) {
    return this.subscriptionService.findSubscriptionByUser(data.userId);
  }
}

