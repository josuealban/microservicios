import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';

describe('UsuariosController', () => {
  let usuariosController: UsuariosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [],
    }).compile();

    usuariosController = app.get<UsuariosController>(UsuariosController);
  });

  it('should be defined', () => {
    expect(usuariosController).toBeDefined();
  });
});

