"use client";

import React from "react";
import { AttackDetail } from "@/types/analysis";

interface AttackBadgeProps {
  attack: AttackDetail;
}

export default function AttackBadge({ attack }: AttackBadgeProps) {
  const severityColors: Record<string, string> = {
    low: "bg-blue-900 text-blue-200 border-blue-700",
    medium: "bg-amber-900 text-amber-200 border-amber-700",
    high: "bg-red-900 text-red-200 border-red-700",
  };

  const typeLabelMap: Record<string, string> = {
    white_text: "White Text Attack",
    keyword_stuffing: "Keyword Stuffing",
    prompt_injection: "Prompt Injection",
    obfuscation: "Obfuscation",
    unicode_manipulation: "Unicode Manipulation",
    other: "Other Attack",
  };

  const severityBadgeColor = {
    low: "bg-blue-600 text-blue-100",
    medium: "bg-amber-600 text-amber-100",
    high: "bg-red-600 text-red-100",
  };

  return (
    <div
      className={`border rounded-lg p-4 ${
        severityColors[attack.severity as keyof typeof severityColors]
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">
            {typeLabelMap[attack.type as keyof typeof typeLabelMap]}
          </h4>
          <p className="text-sm opacity-90">{attack.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            severityBadgeColor[
              attack.severity as keyof typeof severityBadgeColor
            ]
          }`}
        >
          {attack.severity.toUpperCase()}
        </span>
      </div>
      <div className="bg-black bg-opacity-30 rounded p-3 font-mono text-xs text-gray-200 break-words">
        {attack.sample.length > 80 ? `${attack.sample.substring(0, 80)}...` : attack.sample}
      </div>
    </div>
  );
}
