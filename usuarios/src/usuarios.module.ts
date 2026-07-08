import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PhotoModule,
    SubscriptionModule,
  ],
})
export class UsuariosModule { }
