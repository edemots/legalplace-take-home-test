import { AbstractStrategy } from "./abstract-strategy.js";

/**
 * Decreases the benefit as the expiration date approaches.
 * Decreases the benefit twice as fast once the expiration date has passed.
 */
export class DefaultStrategy extends AbstractStrategy {
  update(drug) {
    this.decreaseExpiresIn(drug, 1);

    if (drug.expiresIn < 0) {
      this.decreaseBenefit(drug, 2);
      return drug;
    }
    this.decreaseBenefit(drug, 1);
    return drug;
  }
}
