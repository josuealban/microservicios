import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotoService {
  constructor(private prisma: PrismaService) {}

  async create(createPhotoDto: CreatePhotoDto) {
    return this.prisma.photo.create({
      data: createPhotoDto,
    });
  }

  async findAll() {
    return this.prisma.photo.findMany();
  }

  async findOne(id: number) {
    const photo = await this.prisma.photo.findUnique({
      where: { id },
    });
    if (!photo) throw new RpcException({ statusCode: 404, message: `Foto con id ${id} no encontrada` });
    return photo;
  }

  async findByUser(userId: number) {
    return this.prisma.photo.findMany({
      where: { userId },
    });
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    await this.findOne(id);
    return this.prisma.photo.update({
      where: { id },
      data: updatePhotoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.photo.delete({
      where: { id },
    });
  }

  async replace(id: number, data: UpdatePhotoDto) {
    await this.findOne(id);
    return this.prisma.photo.update({
      where: { id },
      data,
    });
  }
}

