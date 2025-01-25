import { useState } from "react";

interface NewsInputProps {
  onSubmit: (text: string) => void;
}

const NewsInput: React.FC<NewsInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1">
      <label htmlFor="newsInput" className="font-bold text-lg">
        Introdu textul sau link-ul știrii:
      </label>
      <input
        id="newsInput"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ex: Link sau text știre..."
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      >
        Analizează Știrea
      </button>
    </form>
  );
};

export default NewsInput;
