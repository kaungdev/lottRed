import { Prize } from "./prize";

export class Lottery {
  constructor(
    public time: string, 
    public prizes: [Prize]
  ) {}
}
