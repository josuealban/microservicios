import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async create(createMatchDto: CreateMatchDto) {
    return this.prisma.match.create({
      data: {
        user1Id: Math.min(createMatchDto.user1Id, createMatchDto.user2Id),
        user2Id: Math.max(createMatchDto.user1Id, createMatchDto.user2Id),
      },
    });
  }

  async findAll() {
    return this.prisma.match.findMany();
  }

  async findByUser(userId: number) {
    return this.prisma.match.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });
  }

  async findOne(id: number) {
    const match = await this.prisma.match.findUnique({
      where: { id },
    });
    if (!match) throw new RpcException({ statusCode: 404, message: `Match con id ${id} no encontrado` });
    return match;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    await this.findOne(id);
    return this.prisma.match.update({
      where: { id },
      data: updateMatchDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    // When deleting a match, we should just delete it here. 
    // Messages and Chat deletion would be handled by event or separate call.
    return this.prisma.match.delete({
      where: { id },
    });
  }

  async replace(id: number, data: UpdateMatchDto) {
    await this.findOne(id);
    return this.prisma.match.update({
      where: { id },
      data,
    });
  }
}

