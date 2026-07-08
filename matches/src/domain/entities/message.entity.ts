export class Message {
  id: number;
  content: string;
  fromId: number;
  chatId: number;
  createdAt: Date;

  constructor(partial: Partial<Message>) {
    Object.assign(this, partial);
  }
}

