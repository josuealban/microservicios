import { Injectable } from '@nestjs/common';

@Injectable()
export class MensajeriaService {
  getHello(): string {
    return 'Hello World!';
  }
}

