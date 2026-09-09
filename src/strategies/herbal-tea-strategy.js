import { AbstractStrategy } from "./abstract-strategy.js";

/**
 * Increases the benefit as the expiration date approaches.
 * Increases the benefit twice as fast once the expiration date has passed.
 */
export class HerbalTeaStrategy extends AbstractStrategy {
  update(drug) {
    this.decreaseExpiresIn(drug, 1);

    if (drug.expiresIn < 0) {
      this.increaseBenefit(drug, 2);
      return drug;
    }
    this.increaseBenefit(drug, 1);
    return drug;
  }
}
