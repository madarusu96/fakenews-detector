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

    // Simulated API call
    const fakeResponse: AnalysisResult = {
      score: 85,
      isFake: true,
      details: "Textul conține cuvinte alarmante și nu are surse credibile.",
    };

    // Set result after 'API call'
    sendLinkToBackend(input);

    setResult(fakeResponse);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <header className="p-4 bg-blue-600 text-white text-center">
          <h1 className="text-2xl font-bold">Detector de Știri False</h1>
        </header>
        <main className="p-8">
          <NewsInput onSubmit={handleNewsSubmit} />
          {result && <Results result={result} />}
        </main>
      </div>
    </>
  );
}

export default App;
