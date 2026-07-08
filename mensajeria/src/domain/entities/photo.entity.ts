export class Photo {
  id: number;
  url: string;
  isPrimary: boolean;
  userId: number;
  createdAt: Date;

  constructor(partial: Partial<Photo>) {
    Object.assign(this, partial);
  }
}

