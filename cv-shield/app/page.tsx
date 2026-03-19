"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import ResultCard from "@/components/ResultCard";
import { AnalysisResult } from "@/types/analysis";

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred while analyzing the CV");
        setResult(null);
      } else {
        setResult(data as AnalysisResult);
        setError(null);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
      setResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          CV Shield
        </h1>
        <p className="text-gray-400 text-lg">
          Detect white text attacks and prompt injection attempts in your CVs
        </p>
      </div>

      {result ? (
        <ResultCard result={result} onNewAnalysis={handleNewAnalysis} />
      ) : (
        <>
          <UploadZone onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing} />

          {error && (
            <div className="w-full max-w-2xl mx-auto mt-6 p-4 bg-red-900 border border-red-700 rounded-lg">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="w-full max-w-2xl mx-auto mt-6 flex flex-col items-center">
              <div className="mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
              <p className="text-gray-300 text-center">
                Scanning for attacks...
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
