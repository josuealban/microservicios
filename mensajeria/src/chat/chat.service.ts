import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async create(createChatDto: CreateChatDto) {
    return this.prisma.$transaction(async (tx) => {
      const existingChat = await tx.chat.findUnique({
        where: { matchId: createChatDto.matchId },
      });
      
      if (existingChat) {
        return existingChat;
      }
      
      return tx.chat.create({
        data: createChatDto,
      });
    });
  }

  async findAll() {
    return this.prisma.chat.findMany({
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async findOne(id: number) {
    const chat = await this.prisma.chat.findUnique({
      where: { id },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
      },
    });
    if (!chat) {
      throw new RpcException({
        statusCode: 404,
        message: `Chat con id ${id} no encontrado`,
      });
    }
    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    await this.findOne(id);
    return this.prisma.chat.update({
      where: { id },
      data: updateChatDto,
    });
  }

  async replace(id: number, data: UpdateChatDto) {
    await this.findOne(id);
    return this.prisma.chat.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.chat.delete({
      where: { id },
    });
  }
}

