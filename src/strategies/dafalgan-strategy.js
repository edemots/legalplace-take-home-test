import { AbstractStrategy } from "./abstract-strategy.js";
import { DefaultStrategy } from "./default-strategy.js";

/**
 * Decreases benefit twice as fast as normal drugs.
 */
export class DafalganStrategy extends DefaultStrategy {
  static MULTIPLIER = 2;

  update(drug) {
    const previousBenefit = drug.benefit;
    super.update(drug);
    const delta = Math.abs(previousBenefit - drug.benefit);
    drug.setBenefit(previousBenefit - delta * DafalganStrategy.MULTIPLIER);
    return drug;
  }
}
