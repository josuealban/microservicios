import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubscriptionPlanService } from './subscription-plan.service';
import { SUBSCRIPTION_PLAN_PATTERNS } from '../common/patterns';
import { CreateSubscriptionPlanDto, SubscriptionTier } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';

@Controller()
export class SubscriptionPlanController {
  constructor(private readonly subscriptionPlanService: SubscriptionPlanService) {}

  @MessagePattern(SUBSCRIPTION_PLAN_PATTERNS.FIND_ALL)
  findAll() {
    return this.subscriptionPlanService.findAll();
  }

  @MessagePattern(SUBSCRIPTION_PLAN_PATTERNS.FIND_ONE)
  findOne(@Payload() tier: SubscriptionTier) {
    return this.subscriptionPlanService.findOne(tier);
  }

  @MessagePattern(SUBSCRIPTION_PLAN_PATTERNS.CREATE)
  create(@Payload() dto: CreateSubscriptionPlanDto) {
    return this.subscriptionPlanService.create(dto);
  }

  @MessagePattern(SUBSCRIPTION_PLAN_PATTERNS.UPDATE)
  update(@Payload() data: { tier: SubscriptionTier; dto: UpdateSubscriptionPlanDto }) {
    return this.subscriptionPlanService.update(data.tier, data.dto);
  }

  @MessagePattern(SUBSCRIPTION_PLAN_PATTERNS.DELETE)
  remove(@Payload() tier: SubscriptionTier) {
    return this.subscriptionPlanService.remove(tier);
  }
}

