import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { Request, Response } from 'express';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get('/ping')
  check(@Res() res: Response) {
    res.json({ ok: 1 });
  }
  @Post('/issue')
  async postCoupon(@Req() req: Request, @Res() res: Response) {
    const user = req.body.user;
    const result = await this.couponsService.postCoupon(user);
    console.log(result);
    res.json({
      ok: result,
    });
  }
}
