import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { MESSAGE_PATTERNS, EVENTS } from '../common/patterns';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @EventPattern(EVENTS.MATCH_CREATED)
  async handleMatchCreated(@Payload() data: { matchId: number, user1Id: number, user2Id: number }) {
    await this.chatService.create({ matchId: data.matchId });
  }

  @MessagePattern(MESSAGE_PATTERNS.CREATE_CHAT)
  create(@Payload() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @MessagePattern(MESSAGE_PATTERNS.FIND_CHAT_BY_ID)
  findOne(@Payload() id: number) {
    return this.chatService.findOne(id);
  }

  @MessagePattern(MESSAGE_PATTERNS.REPLACE_CHAT)
  replace(@Payload() data: { id: number; body: UpdateChatDto }) {
    return this.chatService.replace(data.id, data.body);
  }
}

