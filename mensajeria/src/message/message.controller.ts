import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MESSAGE_PATTERNS } from '../common/patterns';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern(MESSAGE_PATTERNS.SEND_MESSAGE)
  create(@Payload() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @MessagePattern(MESSAGE_PATTERNS.GET_MESSAGES_BY_CHAT)
  findByChat(@Payload() chatId: number) {
    return this.messageService.findByChat(chatId);
  }

  @MessagePattern(MESSAGE_PATTERNS.REPLACE_MESSAGE)
  replace(@Payload() data: { id: number; body: UpdateMessageDto }) {
    return this.messageService.replace(data.id, data.body);
  }

  @MessagePattern(MESSAGE_PATTERNS.DELETE_MESSAGE)
  remove(@Payload() id: number) {
    return this.messageService.remove(id);
  }
}

