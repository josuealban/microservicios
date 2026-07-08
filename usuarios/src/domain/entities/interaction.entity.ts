import { InteractionType } from '../enums/interaction-type.enum';

export class Interaction {
  id: number;
  type: InteractionType;
  fromId: number;
  toId: number;
  createdAt: Date;

  constructor(partial: Partial<Interaction>) {
    Object.assign(this, partial);
  }
}

