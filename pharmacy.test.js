import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });
  it("should decrease the benefit twice as fast when the drug is expired", () => {
    expect(new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 1)],
    );
  });
  it("should not decrease the benefit below 0", () => {
    expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 0)],
    );
  });
  it("should not increase the benefit above 50", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 2, 50)]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", 1, 50)]);
  });
  test("Herbal Tea benefit increases over time", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 2, 30)]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", 1, 31)]);
  });
  test("Herbal Tea benefit increases twice as fast after expiration", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 30)]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", -1, 32)]);
  });
  test("Magic Pill never expires nor decreases in benefit", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 0, 30)]).updateBenefitValue(),
    ).toEqual([new Drug("Magic Pill", 0, 30)]);
  });
  test("Fervex benefit increases when there are more than 10 days before expiration", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 15, 30)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 14, 31)]);
  });
  test("Fervex benefit increases by 2 when there are 10 days or less", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 10, 30)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 9, 32)]);
  });
  test("Fervex benefit increases by 3 when there are 5 days or less", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 5, 30)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 4, 33)]);
  });
  test("Fervex benefit drops to 0 after expiration", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 0, 30)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });
});
