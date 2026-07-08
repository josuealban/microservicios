import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { USER_PATTERNS } from '../common/patterns';

@Controller()
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @MessagePattern(USER_PATTERNS.CREATE_PHOTO)
  create(@Payload() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @MessagePattern(USER_PATTERNS.FIND_PHOTOS_BY_USER)
  findByUser(@Payload() userId: number) {
    return this.photoService.findByUser(userId);
  }

  @MessagePattern(USER_PATTERNS.REPLACE_PHOTO)
  replace(@Payload() data: { id: number; body: UpdatePhotoDto }) {
    return this.photoService.replace(data.id, data.body);
  }

  @MessagePattern(USER_PATTERNS.DELETE_PHOTO)
  remove(@Payload() id: number) {
    return this.photoService.remove(id);
  }
}

