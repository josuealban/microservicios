import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InteractionService } from './interaction.service';
import { MATCH_PATTERNS } from '../common/patterns';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Controller()
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) { }

  @MessagePattern(MATCH_PATTERNS.CREATE_INTERACTION)
  create(@Payload() data: CreateInteractionDto) {
    return this.interactionService.create(data);
  }

  @MessagePattern(MATCH_PATTERNS.FIND_INTERACTIONS_BY_USER)
  findByUser(@Payload() userId: number) {
    return this.interactionService.findByUser(userId);
  }

  @MessagePattern(MATCH_PATTERNS.REPLACE_INTERACTION)
  replace(@Payload() data: { id: number; body: UpdateInteractionDto }) {
    return this.interactionService.replace(data.id, data.body);
  }
}
