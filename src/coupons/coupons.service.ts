import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class CouponsService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async postCoupon(user: number): Promise<number> {
    // Read DB 에서 COUPON 조회 후 저장 했다는 가정.
    const COUPON = {
      POLICY_ID: '1', // 쿠폰 정책 PK ID & 지정 쿠폰일 수도 있으며, 변할 수 있다.
      DATE_ID: '2', // 일자별 이벤트 시간 PK ID & 일자 별로 선착순 쿠폰 발급을 할 수 있기 때문에 Key 값에 포함한다.
      LIMIT: 10,
    };

    const key = `coupon:time-attack:${COUPON.POLICY_ID}:date-time:${COUPON.DATE_ID}:issued:users`;
    const [issuedUserCount, addCheck]: any = await this.redis
      .multi()
      .scard(key)
      .sadd(key, user)
      .exec();

    if (issuedUserCount[1] >= COUPON.LIMIT) {
      console.log(addCheck, user);
      if (addCheck[1] === 1) {
        const ok = await this.redis.srem(key, user);
        if (ok) {
          console.log('삭제 완료', user);
        } else {
          console.error('삭제 실패', user);
        }
      }

      console.log('쿠폰이 모두 소진되었습니다.', user);
      return 0;
    } else {
      if (addCheck[1] === 1) {
        console.log('발급 성공', user);
        return 1;
      } else if (addCheck[1] === 0) {
        console.log('중복 발급 불가.', user);
        return 0;
      }
    }
  }
}
