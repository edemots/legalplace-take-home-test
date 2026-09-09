import { clamp } from "./src/utils";

export class Drug {
  /**
   * @type {AbstractStrategy}
   */
  #strategy;

  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.setBenefit(benefit);
  }

  setBenefit(score) {
    this.benefit = clamp(score, 0, 50);
    return this;
  }

  /**
   * @param {AbstractStrategy} strategy
   */
  setStrategy(strategy) {
    this.#strategy = strategy;
    return this;
  }

  get strategy() {
    return this.#strategy;
  }
}

export class Pharmacy {
  /**
   * @param {Drug[]} drugs
   */
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (const drug of this.drugs) {
      drug.strategy.update(drug);
    }
    return this.drugs;
  }
}
