import { Stat } from '../../../domain/stat';

export class StatDto {
  public countMutation: number;
  public countNoMutation: number;
  public ratio: number;

  constructor(model: Stat) {
    this.countMutation = model.countMutations;
    this.countNoMutation = model.countNoMutations;
    this.ratio = model.ratio;
  }
}
