export class Match {
  id: number;
  user1Id: number;
  user2Id: number;
  createdAt: Date;

  constructor(partial: Partial<Match>) {
    Object.assign(this, partial);
  }
}

