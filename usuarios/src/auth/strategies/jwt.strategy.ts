import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

interface JwtPayload {
  email: string;
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'the_last_air_master',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub).catch(() => null);
    if (!user) {
      throw new UnauthorizedException('El usuario no existe');
    }
    if (user.profile?.isRestricted) {
      throw new UnauthorizedException('El usuario está restringido');
    }
    return { userId: user.id, email: user.email, role: user.role };
  }
}

