import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionTier } from '../domain/enums/subscription-tier.enum';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  // The usuarios_db does NOT have a SubscriptionPlan table.
  // Subscription tier is stored on Profile.subscription (an enum field).
  // This service manages setting/reading the user's tier from their Profile.

  async findSubscriptionByUser(userId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (!profile) throw new RpcException({ statusCode: 404, message: `Perfil del usuario ${userId} no encontrado` });
    return { userId, tier: profile.subscription };
  }

  async updateSubscription(userId: number, tier: SubscriptionTier) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (!profile) throw new RpcException({ statusCode: 404, message: `Perfil del usuario ${userId} no encontrado` });
    return this.prisma.profile.update({
      where: { userId },
      data: { subscription: tier },
    });
  }
}

