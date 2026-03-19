"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export default function UploadZone({
  onFileSelect,
  isAnalyzing,
}: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      }
    }
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const handleNewUpload = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? "border-blue-500 bg-blue-500 bg-opacity-10"
              : "border-gray-600 hover:border-gray-500"
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-800">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <p className="text-white text-lg font-semibold">Drop your CV here</p>
              <p className="text-gray-400 text-sm mt-1">
                PDF only · Max 5MB
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border border-gray-600 rounded-lg p-8 text-center bg-gray-900">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Upload className="w-5 h-5 text-green-400" />
            <p className="text-white font-semibold">{selectedFile.name}</p>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleAnalyzeClick}
              disabled={isAnalyzing}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                isAnalyzing
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </button>
            <button
              onClick={handleNewUpload}
              disabled={isAnalyzing}
              className="px-6 py-2 rounded-lg font-semibold bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
            >
              Choose Different File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
