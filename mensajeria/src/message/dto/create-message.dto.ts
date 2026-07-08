import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MinLength(1, { message: 'El mensaje no puede estar vacío' })
  content: string;

  @IsInt()
  @IsPositive()
  fromId: number;

  @IsInt()
  @IsPositive()
  chatId: number;
}


