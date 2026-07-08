import { Module } from '@nestjs/common';
import { InteractionModule } from './interaction/interaction.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [InteractionModule, MatchModule],
})
export class MatchesModule {}

