import { IsInt, IsPositive } from 'class-validator';

export class CreateMatchDto {
  @IsInt()
  @IsPositive()
  user1Id: number;

  @IsInt()
  @IsPositive()
  user2Id: number;
}


