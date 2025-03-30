import { useState } from "react";
import "./App.css";
import { AnalysisResult } from "./types/News";
import NewsInput from "./components/NewsInput";
import Results from "./components/Results";
import { sendLinkToBackend } from "./api/sendLinkToBackend";

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleNewsSubmit = async (input: string) => {
    console.log("User Input:", input);

    const results = await sendLinkToBackend(input);
    if (!results || results.length === 0) return;

    const score = results[0].score || 0;

    const labelMapping: { [key: string]: string } = {
      LABEL_0: "fake news",
      LABEL_1: "misinformation",
      LABEL_2: "propaganda",
      LABEL_3: "real news",
      LABEL_4: "satire",
    };

    const label = labelMapping[results[0].label] || "Unknown";

    const fakeResponse: AnalysisResult = {
      score: score,
      isFake:
        label === "fake news" ||
        label === "misinformation" ||
        label === "propaganda",
      details: label,
    };

    setResult(fakeResponse);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-4">
      <header className="w-full bg-blue-600 p-4 text-white text-center shadow-md">
        <h1 className="text-3xl font-bold">Detector de Știri False</h1>
        <p className="text-lg">
          Verifică rapid dacă o știre este adevărată sau falsă.
        </p>
      </header>

      <main className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg mt-6">
        <NewsInput onSubmit={handleNewsSubmit} />

        {result && <Results result={result} />}
      </main>
    </div>
  );
}

export default App;
