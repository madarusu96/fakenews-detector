export interface AnalysisResult {
  score: number;
  isFake: boolean;
  details: string;
}

export interface NewsInput {
  text: string;
}

export interface BackendResponse {
  label: string;
  score: number;
}
