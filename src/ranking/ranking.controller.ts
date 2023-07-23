// src/app.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get('/addScore/:playerId/:score')
  async addPlayerScore(
    @Param('playerId') playerId: string,
    @Param('score') score: number,
  ) {
    await this.rankingService.addPlayerScore(playerId, score);
    return 'Score added successfully.';
  }

  @Get('/rank/:playerId')
  async getPlayerRank(@Param('playerId') playerId: string) {
    const rank = await this.rankingService.getPlayerRank(playerId);
    return rank !== null
      ? `Your rank is ${rank}.`
      : 'Player not found in the ranking.';
  }

  @Get('/topPlayers/:count')
  async getTopPlayers(@Param('count') count: number) {
    const topPlayers = await this.rankingService.getTopPlayers(count);
    return topPlayers;
  }
}
