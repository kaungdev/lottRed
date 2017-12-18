import { LotteryNumber } from "./lotteryNumber";

export class Jackpot {
  constructor(
    public prizeDescription: string,
    public prizeNumber: LotteryNumber
  ) {}
}
