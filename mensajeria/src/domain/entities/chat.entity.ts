export class Chat {
  id: number;
  matchId: number;
  createdAt: Date;

  constructor(partial: Partial<Chat>) {
    Object.assign(this, partial);
  }
}

