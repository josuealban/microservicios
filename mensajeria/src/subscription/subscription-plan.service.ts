import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionPlanDto, SubscriptionTier } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';

@Injectable()
export class SubscriptionPlanService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.subscriptionPlan.findMany({
      orderBy: { price: 'asc' },
    });
  }

  async findOne(tier: SubscriptionTier) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { tier },
    });
    if (!plan) {
      throw new RpcException({
        statusCode: 404,
        message: `Plan de suscripción '${tier}' no encontrado`,
      });
    }
    return plan;
  }

  async create(dto: CreateSubscriptionPlanDto) {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.subscriptionPlan.findUnique({
        where: { tier: dto.tier },
      });
      if (existing) {
        return tx.subscriptionPlan.update({
          where: { tier: dto.tier },
          data: dto,
        });
      }
      return tx.subscriptionPlan.create({ data: dto });
    });
  }

  async update(tier: SubscriptionTier, dto: UpdateSubscriptionPlanDto) {
    await this.findOne(tier);
    return this.prisma.subscriptionPlan.update({
      where: { tier },
      data: dto,
    });
  }

  async remove(tier: SubscriptionTier) {
    await this.findOne(tier);
    return this.prisma.subscriptionPlan.delete({
      where: { tier },
    });
  }
}

