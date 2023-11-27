const gallonWaterMassInKg = 3.785;
const coeffTable: {
  [Key in WaterAgents as WAgent]: [
    number,
    number,
    number,
    number,
    number,
    number
  ];
} = {
  CaCl2: [0.183, 0, 0, 0.324, 0, 0],
  CaSO4: [0.233, 0, 0, 0, 0.558, 0],
  NaCl: [0, 0, 0.393, 0.617, 0, 0],
  MgSO4: [0, 0.0986, 0, 0, 0.39, 0],
  MgCl2: [0, 0.119, 0, 0.348, 0, 0],
  NaHCO3: [0, 0, 0.27, 0, 0, 0.73],
  CaOH2: [0.54, 0, 0, 0, 0, 0],
  CaCO3: [0.4, 0, 0, 0, 0, 0.6],
};
type WAgent =
  | "CaCl2"
  | "CaSO4"
  | "NaCl"
  | "MgSO4"
  | "MgCl2"
  | "NaHCO3"
  | "CaOH2"
  | "CaCO3";
export enum WaterAgents {
  CaCl2 = "CaCl2",
  CaSO4 = "CaSO4",
  NaCl = "NaCl",
  MgSO4 = "MgSO4",
  MgCl2 = "MgCl2",
  NaHCO3 = "NaHCO3",
  CaOH2 = "CaOH2",
  CaCO3 = "CaCO3",
}
type Ion =
  | "calcium"
  | "magnesium"
  | "sodium"
  | "chloride"
  | "sulfate"
  | "bicarbonate";
const ions: Ion[] = [
  "calcium",
  "magnesium",
  "sodium",
  "chloride",
  "sulfate",
  "bicarbonate",
];
type WaterChem = Record<Ion, number>;
type WaterAgentName = keyof typeof coeffTable;
export type WaterChemistry = {
  calcium: number;
  magnesium: number;
  sodium: number;
  chloride: number;
  sulfate: number;
  bicarbonate: number;
};
type Available = Record<WAgent, boolean>;
export type WaterCalculationProps = {
  source: WaterChem;
  target: WaterChem;
  availableAgents: Available;
  volume: number;
};
const makeArray = (num: number) => [...Array(num).keys()];
/**
const withAs = (obj, cb) => cb(obj);
const elim = (arr, n = 0) => arr.slice(-2 - n)[0];
const rest = (arr, n = 0) => arr.filter((i, j) => j !== arr.length - 2 - n);

const gcf = (eq1, eq2) => elim(eq1) * elim(eq2);
const multi = (eq1, eq2) => [
  eq1.map((i) => (i * gcf(eq1, eq2)) / elim(eq1)),
  eq2.map((i) => (i * gcf(eq1, eq2)) / elim(eq2)),
];

const diff = (eq1, eq2) =>
  rest(
    makeArray(eq1.length).map(
      (i) => multi(eq1, eq2)[0][i] - multi(eq1, eq2)[1][i]
    )
  );

const reduce = (mat) =>
  mat.length === 1
    ? []
    : [diff(mat[0], mat[1]), ...reduce(mat.slice(1 - mat.length))];

const solve = (mat) =>
  mat[0].length === 2 ? mat[0][1] / mat[0][0] : solve(reduce(mat));

const swap = (arr, n) => [elim(arr, n), ...rest(arr, n)];

const answer = (mat) =>
  mat.length >= mat[0].length - 1 &&
  makeArray(mat[0].length - 1)
    .map((i) => mat.map((j) => swap(j, i)))
    .map(solve)
    .reverse();
*/
export function calculateWaterAdditions({
  source,
  target,
  volume,
  availableAgents,
}: WaterCalculationProps) {
  const massSolute = gallonWaterMassInKg / volume;
  const matrix = Object.entries(availableAgents).reduce((acc, [k, v]) => {
    if (v) {
      acc.push(
        coeffTable[k as WAgent].map((coeff) => (1000 * coeff) / massSolute)
      );
    }
    return acc;
  }, [] as number[][]);
  const system = makeArray(6).map((v, i) => [
    ...matrix.map((eq) => eq[i]),
    target[ions[i]],
  ]);
  console.log(system);
}
