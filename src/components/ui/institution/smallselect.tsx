
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../institution/select";

interface SmallSelectProps {
  selectedType: number; // O valor selecionado é um número
  setSelectedType: (value: string) => void; // A função recebe uma string
  placeholder: string;
  items: string[];
}

const getBimestreName = (selectedType: number) => {
  switch (selectedType) {
    case 1:
      return "1º Bimestre";
    case 2:
      return "2º Bimestre";
    case 3:
      return "3º Bimestre";
    case 4:
      return "4º Bimestre";
    default:
      return "Selecione um bimestre";
  }
};

export default function SearchInput({
  selectedType,
  setSelectedType,
  placeholder,
  items,
}: SmallSelectProps) {
  return (
    <div className="relative w-full max-w-md">
      <Select
        value={getBimestreName(selectedType)} 
        onChange={(value) => setSelectedType(value)}  
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item}> {/* Usa o item como value */}
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}