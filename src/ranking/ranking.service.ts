// src/ranking/ranking.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class RankingService {
  constructor(@InjectRedis() private readonly client: Redis) {}

  async addPlayerScore(playerId: string, score: number) {
    // ZINCRBY 명령어를 사용하여 랭킹에 점수를 추가합니다.
    await this.client.zincrby('ranking', score, playerId);
  }

  async getPlayerRank(playerId: string) {
    // ZREVRANK 명령어를 사용하여 랭킹에서 플레이어의 랭크를 가져옵니다.
    const rank = await this.client.zrevrank('ranking', playerId);
    return rank !== null ? rank + 1 : null;
  }

  async getTopPlayers(count: number) {
    // ZREVRANGE 명령어를 사용하여 상위 플레이어들을 가져옵니다.
    const players = await this.client.zrevrange(
      'ranking',
      0,
      count - 1,
      'WITHSCORES',
    );
    const topPlayers = [];
    console.log(players);
    for (let i = 0; i < players.length; i += 2) {
      topPlayers.push({
        playerId: players[i],
        score: parseInt(players[i + 1]),
      });
    }
    return topPlayers;
  }
}
