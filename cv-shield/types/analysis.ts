export type Verdict = "clean" | "suspicious" | "attacked";
export type AttackType = 
  | "white_text"
  | "keyword_stuffing"
  | "prompt_injection"
  | "obfuscation"
  | "unicode_manipulation"
  | "other";
export type Severity = "low" | "medium" | "high";

export interface AttackDetail {
  type: AttackType;
  description: string;
  sample: string;
  severity: Severity;
}

export interface AnalysisResult {
  verdict: Verdict;
  confidence: number;
  summary: string;
  attacks_found: AttackDetail[];
  recommendation: string;
}
