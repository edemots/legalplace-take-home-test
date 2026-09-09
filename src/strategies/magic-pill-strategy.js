import { AbstractStrategy } from "./abstract-strategy.js";

/**
 * Increases the benefit as the expiration date approaches.
 * Increases the benefit twice as fast once the expiration date has passed.
 */
export class MagicPillStrategy extends AbstractStrategy {
  update(drug) {
    return drug;
  }
}
