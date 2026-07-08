import { SubscriptionTier } from '../enums/subscription-tier.enum.js';

export class SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  description: string;
  price: number;
  features: string[];

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<SubscriptionPlan>) {
    Object.assign(this, partial);
    this.features = this.features || [];
  }
}

