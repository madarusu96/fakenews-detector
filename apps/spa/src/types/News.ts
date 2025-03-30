export interface AnalysisResult {
  score: number; // Probability score (0-100%)
  isFake: boolean; // True if detected as fake
  details: string; // Analysis explanation
}

export interface NewsInput {
  text: string; // Input text or URL
}

export interface BackendResponse {
  label: string;
  score: number;
}
