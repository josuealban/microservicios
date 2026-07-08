import { IsString, IsNumber, IsArray, IsEnum } from 'class-validator';

export enum SubscriptionTier {
  FREE = 'FREE',
  BRONZE = 'BRONZE',
  GOLD = 'GOLD',
  PREMIUM = 'PREMIUM',
  PLATINUM = 'PLATINUM',
}

export class CreateSubscriptionPlanDto {
  @IsEnum(SubscriptionTier)
  tier: SubscriptionTier;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  features: string[];
}

