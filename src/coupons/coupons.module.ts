import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';

@Module({
  imports: [],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
