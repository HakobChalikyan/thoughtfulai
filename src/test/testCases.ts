import { SORTING_THRESHOLDS } from "../core/constants";

export const testCases = [
  {
    width: 50,
    height: 50,
    length: 50,
    mass: 10,
    name: "Small Standard Package",
  },
  {
    width: SORTING_THRESHOLDS.DIMENSION_THRESHOLD - 1,
    height: 10,
    length: 10,
    mass: SORTING_THRESHOLDS.MASS_THRESHOLD - 0.1,
    name: "Edge Case Standard",
  },
  {
    width: SORTING_THRESHOLDS.DIMENSION_THRESHOLD,
    height: 20,
    length: 20,
    mass: 15,
    name: "Bulky by Dimension",
  },
  {
    width: 100,
    height: 100,
    length: 100,
    mass: 10,
    name: "Bulky by Volume",
  },
  {
    width: 30,
    height: 30,
    length: 30,
    mass: SORTING_THRESHOLDS.MASS_THRESHOLD + 5,
    name: "Heavy Package",
  },
  {
    width: 200,
    height: 100,
    length: 50,
    mass: SORTING_THRESHOLDS.MASS_THRESHOLD + 10,
    name: "Rejected Package",
  },
];