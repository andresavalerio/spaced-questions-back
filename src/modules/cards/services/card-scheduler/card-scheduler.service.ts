import { CardRevisionLimitPassedError } from "modules/cards/errors/card.errors";
import {
  ICardScheduler,
  Revision,
} from "modules/cards/interfaces/card.interfaces";

export class FibonacciCardScheduler implements ICardScheduler {
  private dayTime = 1000 * 60 * 60 * 24;

  private limitRevision = 13;

  private fibonacciMap: Record<number, number> = {
    1: 1,
    2: 2,
    3: 3,
    4: 5,
    5: 8,
    6: 13,
    7: 21,
    8: 34,
    9: 55,
    10: 89,
    11: 144,
    12: 233,
    13: 377,
  };

  constructor() {}

  public predictNextRevisionBasedOnAnswer(
    presentRevision: number,
    answer: boolean
  ): Revision {
    const revisionModifier = answer ? 1 : -1;

    const nextRevision = presentRevision + revisionModifier;

    if (nextRevision > this.limitRevision)
      throw new CardRevisionLimitPassedError();

    const fibonacciPosition = nextRevision > 0 ? nextRevision : 1;

    const addUpCount = this.fibonacciMap[fibonacciPosition];

    const today = new Date();

    const nextRevisionTime = today.getTime() + addUpCount * this.dayTime;

    return [nextRevision, new Date(nextRevisionTime)];
  }
}
