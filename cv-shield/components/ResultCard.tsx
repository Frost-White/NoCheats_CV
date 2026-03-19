"use client";


import { AnalysisResult } from "@/types/analysis";
import AttackBadge from "./AttackBadge";
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";

interface ResultCardProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export default function ResultCard({ result, onNewAnalysis }: ResultCardProps) {
  const isSuspicious = result.verdict === "suspicious";
  const isAttacked = result.verdict === "attacked";

  let backgroundColor = "bg-gray-900";
  let accentColor = "text-green-400";
  let borderColor = "border-green-700";
  let title = "No attacks detected";
  let icon = <CheckCircle className="w-12 h-12 text-green-400" />;
  let iconBgColor = "bg-green-900";

  if (isSuspicious) {
    backgroundColor = "bg-gray-900";
    accentColor = "text-amber-400";
    borderColor = "border-amber-700";
    title = "Suspicious patterns found";
    icon = <AlertTriangle className="w-12 h-12 text-amber-400" />;
    iconBgColor = "bg-amber-900";
  } else if (isAttacked) {
    backgroundColor = "bg-gray-900";
    accentColor = "text-red-400";
    borderColor = "border-red-700";
    title = "Attack detected";
    icon = <AlertCircle className="w-12 h-12 text-red-400" />;
    iconBgColor = "bg-red-900";
  }

  return (
    <div className={`w-full max-w-2xl mx-auto border rounded-lg p-8 ${backgroundColor} ${borderColor}`}>
      {/* Header with icon */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-4 rounded-full ${iconBgColor}`}>
          {icon}
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${accentColor}`}>{title}</h2>
          <p className="text-gray-400 text-sm mt-1">
            Confidence: {Math.round(result.confidence * 100)}%
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <p className="text-gray-200">{result.summary}</p>
      </div>

      {/* Attacks found (if any) */}
      {result.attacks_found && result.attacks_found.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-4">Threats Found</h3>
          <div className="space-y-3">
            {result.attacks_found.map((attack, index) => (
              <AttackBadge key={index} attack={attack} />
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      <div className="mb-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-700">
        <p className="text-blue-200 flex items-start gap-2">
          <span className="text-blue-400 font-semibold flex-shrink-0">💡</span>
          <span>{result.recommendation}</span>
        </p>
      </div>

      {/* Action button */}
      <button
        onClick={onNewAnalysis}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
      >
        Analyze Another CV
      </button>
    </div>
  );
}
