import { SortResult } from "./types";
import { SORTING_THRESHOLDS, STACK_NAMES } from "./constants";

export function sort(
  width: number,
  height: number,
  length: number,
  mass: number,
): SortResult {
  if (width <= 0 || height <= 0 || length <= 0 || mass <= 0) {
    throw new Error("All dimensions and mass must be positive numbers");
  }

  if (
    !isFinite(width) ||
    !isFinite(height) ||
    !isFinite(length) ||
    !isFinite(mass)
  ) {
    throw new Error("All inputs must be finite numbers");
  }

  const volume = width * height * length;
  const isBulky =
    volume >= SORTING_THRESHOLDS.VOLUME_THRESHOLD ||
    width >= SORTING_THRESHOLDS.DIMENSION_THRESHOLD ||
    height >= SORTING_THRESHOLDS.DIMENSION_THRESHOLD ||
    length >= SORTING_THRESHOLDS.DIMENSION_THRESHOLD;
  const isHeavy = mass >= SORTING_THRESHOLDS.MASS_THRESHOLD;

  if (isBulky && isHeavy) {
    return STACK_NAMES.REJECTED;
  } else if (isBulky || isHeavy) {
    return STACK_NAMES.SPECIAL;
  } else {
    return STACK_NAMES.STANDARD;
  }
}
