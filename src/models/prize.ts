import { LotteryNumber } from "./lotteryNumber";

export class Prize {
  constructor(
    public prizeId: string,
    public prizeDescription: string,
    public lotteryNumbers: [LotteryNumber]
  ) {}
}
