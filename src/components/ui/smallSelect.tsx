import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./institution/select";

interface SmallSelectProps {
  selectedType: number;
  setSelectedType: (value: string) => void;
  placeholder: string;
  items: string[]; 
}

export default function SearchInput({
  selectedType,
  setSelectedType,
  placeholder,
  items,
}: SmallSelectProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full max-w-md">
      <Select value={selectedType} onChange={setSelectedType}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder}>{selectedType}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {items.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
