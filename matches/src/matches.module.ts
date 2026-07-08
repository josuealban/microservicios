import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InteractionModule } from './interaction/interaction.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    InteractionModule, MatchModule],
})
export class MatchesModule {}

