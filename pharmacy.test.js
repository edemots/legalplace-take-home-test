import { Drug, Pharmacy } from "./pharmacy";
import { DafalganStrategy } from "./src/strategies/dafalgan-strategy";
import { DefaultStrategy } from "./src/strategies/default-strategy";
import { FervexStrategy } from "./src/strategies/fervex-strategy";
import { HerbalTeaStrategy } from "./src/strategies/herbal-tea-strategy";
import { MagicPillStrategy } from "./src/strategies/magic-pill-strategy";

describe("Pharmacy", () => {
  it("should not allow drugs to have negative benefit", () => {
    const drug = new Drug("test", 1, -1);
    expect(drug.benefit).toBe(0);
  });

  it("should not allow drugs to have a benefit above 50", () => {
    const drug = new Drug("test", 1, 51);
    console.log(drug);

    expect(drug.benefit).toBe(50);
  });

  it.each([
    {
      description: "Default strategy decreases both expiresIn and benefit by 1",
      strategy: new DefaultStrategy(),
      drug: new Drug("test", 2, 3),
      expected: new Drug("test", 1, 2),
    },
    {
      description:
        "Default strategy decreases benefit by 2 when expiresIn is < 0",
      strategy: new DefaultStrategy(),
      drug: new Drug("test", 0, 3),
      expected: new Drug("test", -1, 1),
    },
    {
      description: "Default strategy does not decrease benefit below 0",
      strategy: new DefaultStrategy(),
      drug: new Drug("test", 0, 0),
      expected: new Drug("test", -1, 0),
    },
    {
      description: "Herbal Tea strategy increases benefit by 1",
      strategy: new HerbalTeaStrategy(),
      drug: new Drug("test", 1, 3),
      expected: new Drug("test", 0, 4),
    },
    {
      description:
        "Herbal Tea strategy increases benefit by 2 when expiresIn < 0",
      strategy: new HerbalTeaStrategy(),
      drug: new Drug("test", 0, 3),
      expected: new Drug("test", -1, 5),
    },
    {
      description: "Magic Pill strategy does not change benefit or expiresIn",
      strategy: new MagicPillStrategy(),
      drug: new Drug("test", 0, 3),
      expected: new Drug("test", 0, 3),
    },
    {
      description:
        "Fervex strategy increases benefit by 1 when expiresIn is > 10",
      strategy: new FervexStrategy(),
      drug: new Drug("test", 11, 3),
      expected: new Drug("test", 10, 4),
    },
    {
      description:
        "Fervex strategy increases benefit by 2 when 5 < expiresIn <= 10",
      strategy: new FervexStrategy(),
      drug: new Drug("test", 7, 3),
      expected: new Drug("test", 6, 5),
    },
    {
      description:
        "Fervex strategy increases benefit by 3 when 0 < expiresIn <= 5",
      strategy: new FervexStrategy(),
      drug: new Drug("test", 3, 3),
      expected: new Drug("test", 2, 6),
    },
    {
      description: "Fervex strategy sets benefit to 0 when expiresIn <= 0",
      strategy: new FervexStrategy(),
      drug: new Drug("test", 0, 3),
      expected: new Drug("test", -1, 0),
    },
    {
      description: "Dafalgan strategy decreases benefit twice as fast as normal drugs",
      strategy: new DafalganStrategy(),
      drug: new Drug("test", 1, 4),
      expected: new Drug("test", 0, 2),
    },
    {
      description: "Dafalgan strategy decreases benefit twice as fast as normal drugs after expiration",
      strategy: new DafalganStrategy(),
      drug: new Drug("test", 0, 4),
      expected: new Drug("test", -1, 0),
    },
  ])("$description", ({ strategy, drug, expected }) => {
    expect(
      new Pharmacy([drug.setStrategy(strategy)]).updateBenefitValue(),
    ).toEqual([expected]);
  });
});
