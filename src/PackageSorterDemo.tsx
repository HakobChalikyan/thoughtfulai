import { useState } from "react";
import {
  Package,
  Scale,
  Ruler,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { sort } from "./core/packageSorter";
import { SortResult } from "./core/types";
import { SORTING_THRESHOLDS, STACK_NAMES } from "./core/constants";
import { testCases } from "./test/testCases";

export default function PackageSorterDemo() {
  const [width, setWidth] = useState<string>("50");
  const [height, setHeight] = useState<string>("50");
  const [length, setLength] = useState<string>("50");
  const [mass, setMass] = useState<string>("10");

  // Calculate result and stats directly from current state
  const getCalculations = () => {
    try {
      const w = parseFloat(width);
      const h = parseFloat(height);
      const l = parseFloat(length);
      const m = parseFloat(mass);

      if (isNaN(w) || isNaN(h) || isNaN(l) || isNaN(m)) {
        return {
          result: null,
          error: "Please enter valid numbers",
          stats: { volume: 0, isBulky: false, isHeavy: false }
        };
      }

      const sortResult = sort(w, h, l, m);
      const volume = w * h * l;
      const isBulky =
        volume >= SORTING_THRESHOLDS.VOLUME_THRESHOLD ||
        w >= SORTING_THRESHOLDS.DIMENSION_THRESHOLD ||
        h >= SORTING_THRESHOLDS.DIMENSION_THRESHOLD ||
        l >= SORTING_THRESHOLDS.DIMENSION_THRESHOLD;
      const isHeavy = m >= SORTING_THRESHOLDS.MASS_THRESHOLD;

      return {
        result: sortResult,
        error: "",
        stats: { volume, isBulky, isHeavy }
      };
    } catch (err) {
      return {
        result: null,
        error: err instanceof Error ? err.message : "Invalid input",
        stats: { volume: 0, isBulky: false, isHeavy: false }
      };
    }
  };

  const { result, error, stats } = getCalculations();

  const loadTestCase = (testCase: (typeof testCases)[0]) => {
    setWidth(testCase.width.toString());
    setHeight(testCase.height.toString());
    setLength(testCase.length.toString());
    setMass(testCase.mass.toString());
  };

  const getResultColor = (result: SortResult) => {
    switch (result) {
      case STACK_NAMES.STANDARD:
        return "text-green-600 bg-green-50 border-green-200";
      case STACK_NAMES.SPECIAL:
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case STACK_NAMES.REJECTED:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getResultIcon = (result: SortResult) => {
    switch (result) {
      case STACK_NAMES.STANDARD:
        return <CheckCircle className="w-5 h-5" />;
      case STACK_NAMES.SPECIAL:
        return <AlertTriangle className="w-5 h-5" />;
      case STACK_NAMES.REJECTED:
        return <XCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Package className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            thoughtful.ai Robotics Package Sorter
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              Package Dimensions
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width (cm)
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Length (cm)
                </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Mass (kg)
              </label>
              <input
                type="number"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.1"
              />
            </div>

            {/* Test Cases */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Quick Test Cases
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {testCases.map((testCase, index) => (
                  <button
                    key={index}
                    onClick={() => loadTestCase(testCase)}
                    className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
                  >
                    <div className="font-medium text-sm">{testCase.name}</div>
                    <div className="text-xs text-gray-500">
                      {testCase.width}×{testCase.height}×{testCase.length}cm,{" "}
                      {testCase.mass}kg
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Sorting Result
            </h2>

            {error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            ) : result ? (
              <div
                className={`p-6 border-2 rounded-lg ${getResultColor(result)}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {getResultIcon(result)}
                  <span className="text-2xl font-bold">{result}</span>
                </div>
                <p className="text-sm opacity-80">
                  {result === STACK_NAMES.STANDARD &&
                    "Package can be handled normally by automated systems."}
                  {result === STACK_NAMES.SPECIAL &&
                    "Package requires special handling due to size or weight."}
                  {result === STACK_NAMES.REJECTED &&
                    "Package is both bulky and heavy - cannot be processed."}
                </p>
              </div>
            ) : (
              <div className="p-6 border-2 border-gray-200 rounded-lg bg-gray-50">
                <p className="text-gray-500 text-center">
                  Enter package dimensions to see sorting result
                </p>
              </div>
            )}

            {/* Package Analysis */}
            {!error && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Package Analysis
                </h3>

                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volume:</span>
                    <span className="font-medium">
                      {stats.volume.toLocaleString()} cm³
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Is Bulky:</span>
                    <span
                      className={`font-medium ${stats.isBulky ? "text-orange-600" : "text-green-600"}`}
                    >
                      {stats.isBulky ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Is Heavy:</span>
                    <span
                      className={`font-medium ${stats.isHeavy ? "text-orange-600" : "text-green-600"}`}
                    >
                      {stats.isHeavy ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {/* Dynamic Sorting Rules */}
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Current Sorting Rules
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • <strong>Bulky:</strong> Volume ≥{" "}
                      {SORTING_THRESHOLDS.VOLUME_THRESHOLD.toLocaleString()} cm³
                      OR any dimension ≥{" "}
                      {SORTING_THRESHOLDS.DIMENSION_THRESHOLD} cm
                    </li>
                    <li>
                      • <strong>Heavy:</strong> Mass ≥{" "}
                      {SORTING_THRESHOLDS.MASS_THRESHOLD} kg
                    </li>
                    <li>
                      • <strong>{STACK_NAMES.REJECTED}:</strong> Both bulky AND
                      heavy
                    </li>
                    <li>
                      • <strong>{STACK_NAMES.SPECIAL}:</strong> Either bulky OR
                      heavy
                    </li>
                    <li>
                      • <strong>{STACK_NAMES.STANDARD}:</strong> Neither bulky
                      nor heavy
                    </li>
                  </ul>
                </div>

                {/* Threshold Values Display */}
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Current Thresholds
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volume Threshold:</span>
                      <span className="font-mono font-medium">
                        {SORTING_THRESHOLDS.VOLUME_THRESHOLD.toLocaleString()}{" "}
                        cm³
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Dimension Threshold:
                      </span>
                      <span className="font-mono font-medium">
                        {SORTING_THRESHOLDS.DIMENSION_THRESHOLD} cm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mass Threshold:</span>
                      <span className="font-mono font-medium">
                        {SORTING_THRESHOLDS.MASS_THRESHOLD} kg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}