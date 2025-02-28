import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchInput(props: { placeholder: string | undefined; }) {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={props.placeholder}
        className="w-full border border-blue-500 rounded-full py-2 px-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-black"
      />
      <button className="absolute inset-y-0 right-3 flex items-center text-blue-500">

        <Search size={20} />
        
      </button>
    </div>
  );
}