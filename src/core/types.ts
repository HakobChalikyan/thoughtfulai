export type SortResult = "STANDARD" | "SPECIAL" | "REJECTED";

export interface Package {
  width: number;
  height: number;
  length: number;
  mass: number;
}

export interface PackageAnalysis {
  volume: number;
  isBulky: boolean;
  isHeavy: boolean;
  result: SortResult;
}

export interface TestCase {
  name: string;
  package: Package;
  expected: SortResult;
  description: string;
}
