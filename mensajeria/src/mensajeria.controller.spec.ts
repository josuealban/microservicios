import { Test, TestingModule } from '@nestjs/testing';
import { MensajeriaController } from './mensajeria.controller';
import { MensajeriaService } from './mensajeria.service';

describe('MensajeriaController', () => {
  let mensajeriaController: MensajeriaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MensajeriaController],
      providers: [MensajeriaService],
    }).compile();

    mensajeriaController = app.get<MensajeriaController>(MensajeriaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mensajeriaController.getHello()).toBe('Hello World!');
    });
  });
});

