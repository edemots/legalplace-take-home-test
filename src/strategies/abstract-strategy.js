import { clamp } from '../utils';

export class AbstractStrategy {
  constructor() {
    if (this.constructor === AbstractStrategy) {
      throw new Error("AbstractStrategy cannot be instantiated.");
    }
  }

  /**
   * @param {import('../../pharmacy').Drug} drug the drug to update
   */
  update(drug) {
    throw new Error("Update method must be implemented.");
  }

  /**
   * @param {import('../../pharmacy').Drug} drug the drug whose expiration is to be decreased
   * @param {number} days the number of days to decrease the expiration by
   */
  decreaseExpiresIn(drug, days) {
    drug.expiresIn -= days;
  }

  /**
   * @param {import('../../pharmacy').Drug} drug the drug whose expiration is to be decreased
   * @param {number} score the score to decrease the benefit by
   */
  decreaseBenefit(drug, score) {
    drug.setBenefit(drug.benefit - score);
  }

  /**
   * @param {import('../../pharmacy').Drug} drug the drug whose benefit is to be increased
   * @param {number} score the score to increase the benefit by
   */
  increaseBenefit(drug, score) {
    drug.setBenefit(drug.benefit + score);
  }

  /**
   * @param {import('../../pharmacy').Drug} drug the drug whose benefit is to be set
   * @param {number} score the score to set the benefit to
   */
  setBenefit(drug, score) {
    drug.setBenefit(score);
  }
}
