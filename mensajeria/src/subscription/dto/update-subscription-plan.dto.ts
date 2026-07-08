import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionPlanDto, SubscriptionTier } from './create-subscription-plan.dto';

export class UpdateSubscriptionPlanDto extends PartialType(CreateSubscriptionPlanDto) {
  tier?: SubscriptionTier;
}

