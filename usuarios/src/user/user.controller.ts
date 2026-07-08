import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { USER_PATTERNS } from '../common/patterns';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern(USER_PATTERNS.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(USER_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern(USER_PATTERNS.UPDATE)
  update(@Payload() data: { id: number; body: UpdateUserDto }) {
    return this.userService.update(data.id, data.body);
  }

  @MessagePattern(USER_PATTERNS.REPLACE)
  replace(@Payload() data: { id: number; body: UpdateUserDto }) {
    return this.userService.replace(data.id, data.body);
  }

  @MessagePattern(USER_PATTERNS.DELETE)
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
