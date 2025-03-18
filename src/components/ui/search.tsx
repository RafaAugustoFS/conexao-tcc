import { useState } from "react";
import { Search } from "lucide-react";


interface SearchInputProps {
  placeholder?: string;
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}


export default function SearchInput({
  placeholder = "Buscar...",
  value = "", 
  onChange, 
}: SearchInputProps) {
  const [query, setQuery] = useState(value);

  // Função para lidar com mudanças no input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    if (onChange) {
      onChange(e); 
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full border border-blue-500 rounded-full py-2 px-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-black dark:text-white dark:border-gray-600"
      />
      <button
        className="absolute inset-y-0 right-3 flex items-center text-blue-500"
        aria-label="Buscar"
      >
        <Search size={20} />
      </button>
    </div>
  );
}