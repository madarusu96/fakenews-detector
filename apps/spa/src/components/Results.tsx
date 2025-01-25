import { AnalysisResult } from "../types/News";

interface ResultsProps {
  result: AnalysisResult;
}

const Results: React.FC<ResultsProps> = ({ result }) => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Rezultatele Analizei</h2>
      <p className="mb-2">
        Scor de Autenticitate:{" "}
        <strong>{result.score}%</strong>
      </p>
      <p className="mb-2">
        Statut:{" "}
        {result.isFake ? (
          <span className="text-red-500 font-bold">Știre Falsă</span>
        ) : (
          <span className="text-green-500 font-bold">Știre Reală</span>
        )}
      </p>
      <div>
        <h3 className="font-semibold">Detalii:</h3>
        <p>{result.details}</p>
      </div>
    </div>
  );
};

export default Results;
