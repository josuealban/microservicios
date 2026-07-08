import { IsArray, IsEnum, IsNumber, IsString, ArrayMinSize, Min } from 'class-validator';
import { SubscriptionTier } from '../../domain/enums/subscription-tier.enum';

export class CreateSubscriptionDto {
  @IsEnum(SubscriptionTier, { message: 'El plan debe ser un nivel de suscripción válido' })
  tier: SubscriptionTier;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1, { message: 'Debe incluir al menos una característica' })
  features: string[];
}

