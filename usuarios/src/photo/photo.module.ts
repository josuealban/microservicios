import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}

