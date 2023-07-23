import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RankingModule } from './ranking/ranking.module';
import { CouponsModule } from './coupons/coupons.module';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        username: 'default',
        password: 'redispw',
        port: 6379,
      },
    }),
    RankingModule,
    CouponsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
