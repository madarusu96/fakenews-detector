import { AnalysisResult } from "../types/News";

// Definim tipul pentru etichetele posibile
type Label =
  | "fake news"
  | "misinformation"
  | "propaganda"
  | "real news"
  | "satire";

interface ResultsProps {
  result: AnalysisResult;
}

const Results: React.FC<ResultsProps> = ({ result }) => {
  const { score, isFake, details } = result;

  // Mapează culorile pe baza etichetei
  const labelColors: Record<Label, string> = {
    "fake news": "bg-red-500",
    misinformation: "bg-yellow-500",
    propaganda: "bg-orange-500",
    "real news": "bg-green-500",
    satire: "bg-blue-500",
  };

  // Asigură-te că detaliile sunt valide înainte de a indexa în labelColors
  const labelClass = labelColors[details as Label] || "bg-gray-500"; // Aici castăm 'details' la 'Label'

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Rezultatul Analizei:</h2>

      <div className="mb-4">
        <p className="text-lg font-medium">Scor: {score}</p>
        <p
          className={`text-lg font-semibold mt-2 ${labelClass} text-white p-2 inline-block rounded`}
        >
          Etichetă: {details}
        </p>
      </div>

      <div>
        <p className="text-md">
          Detalii:{" "}
          {isFake
            ? "Aceasta este o știre falsă."
            : "Aceasta este o știre adevărată."}
        </p>
      </div>
    </div>
  );
};

export default Results;
