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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="newsInput" className="text-lg font-semibold">
        Introduceți textul sau link-ul știrii:
      </label>
      <input
        id="newsInput"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ex: Link sau text știre..."
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="submit"
        className="p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Analizează Știrea
      </button>
    </form>
  );
};

export default NewsInput;
