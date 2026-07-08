import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    return this.prisma.$transaction(async (tx) => {
      const chat = await tx.chat.findUnique({
        where: { id: createMessageDto.chatId },
      });
      if (!chat) {
        throw new RpcException({
          statusCode: 404,
          message: `Chat con id ${createMessageDto.chatId} no encontrado`,
        });
      }
      return tx.message.create({
        data: createMessageDto,
      });
    });
  }

  async findAll() {
    return this.prisma.message.findMany();
  }

  async findOne(id: number) {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });
    if (!message) {
      throw new RpcException({
        statusCode: 404,
        message: `Mensaje con id ${id} no encontrado`,
      });
    }
    return message;
  }

  async findByChat(chatId: number) {
    return this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    await this.findOne(id);
    return this.prisma.message.update({
      where: { id },
      data: updateMessageDto,
    });
  }

  async replace(id: number, data: UpdateMessageDto) {
    await this.findOne(id);
    return this.prisma.message.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.message.delete({
      where: { id },
    });
  }
}

