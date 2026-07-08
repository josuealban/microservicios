import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { USER_PATTERNS } from '../common/patterns';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern(USER_PATTERNS.REGISTER)
  register(@Payload() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @MessagePattern(USER_PATTERNS.LOGIN)
  async login(@Payload() data: LoginDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      throw new RpcException({
        statusCode: 401,
        message: 'Credenciales inválidas',
      });
    }
    return this.authService.login(user);
  }
}

