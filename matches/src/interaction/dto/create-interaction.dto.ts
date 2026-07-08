import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { InteractionType } from '../../domain/enums/interaction-type.enum';

export class CreateInteractionDto {
  @IsEnum(InteractionType, { message: 'El tipo debe ser LIKE, DISLIKE, SUPERLIKE o REPORT' })
  type: InteractionType;

  @IsInt()
  @IsPositive()
  fromId: number;

  @IsInt()
  @IsPositive()
  toId: number;
}


