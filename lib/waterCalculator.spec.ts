import { expect, test } from "vitest";
import { WaterChemistry, calculateWaterAdditions } from "./waterCalculator";
const source: WaterChemistry = {
  calcium: 0,
  sodium: 0,
  magnesium: 0,
  chloride: 0,
  sulfate: 0,
  bicarbonate: 0,
};
test("shuold be good", () => {
  expect(!!2).toBe(true);
});
test("should optimize with one variable", () => {
  const target: WaterChemistry = {
    calcium: 20,
    sodium: 20,
    magnesium: 1,
    chloride: 20,
    sulfate: 0,
    bicarbonate: 0,
  };

  const res = calculateWaterAdditions({
    source,
    volume: 1,
    target,
    availableAgents: {
      CaCl2: true,
      CaSO4: true,
      NaCl: true,
      MgSO4: true,
      MgCl2: false,
      NaHCO3: true,
      CaOH2: false,
      CaCO3: true,
    },
  });
});
