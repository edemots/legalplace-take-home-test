import { Drug, Pharmacy } from "./pharmacy";
import { DefaultStrategy } from "./src/strategies/default-strategy";
import { HerbalTeaStrategy } from "./src/strategies/herbal-tea-strategy";
import { FervexStrategy } from "./src/strategies/fervex-strategy";
import { MagicPillStrategy } from "./src/strategies/magic-pill-strategy";

import fs from "fs";

/**
 * @type {Object.<string, import('./src/strategies/abstract-strategy').AbstractStrategy>}
 */
const STRATEGIES = {
  default: new DefaultStrategy(),
  herbal_tea: new HerbalTeaStrategy(),
  fervex: new FervexStrategy(),
  magic_pill: new MagicPillStrategy(),
};

/**
 * @typedef DrugConfig
 * @property {string} name
 * @property {number} expiresIn
 * @property {number} benefit
 * @property {keyof typeof STRATEGIES} strategy
 */

/** @type {DrugConfig[]} */
const drugsConfig = JSON.parse(fs.readFileSync("./drugs.json", "utf-8"));

const drugs = drugsConfig.map((drug) =>
  new Drug(drug.name, drug.expiresIn, drug.benefit).setStrategy(
    STRATEGIES[drug.strategy] || STRATEGIES.default,
  ),
);

const pharmacy = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
}

/* eslint-disable no-console */
fs.writeFile(
  "output.json",
  JSON.stringify({ result: log }, null, 2).concat("\n"),
  (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  },
);

/* eslint-enable no-console */
