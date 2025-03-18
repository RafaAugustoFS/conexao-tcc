import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./institution/select";

interface SmallSelectProps {
  selectedType: string; // Alterado para string
  setSelectedType: (value: string) => void; // Mantido como string
  placeholder: string;
  items: string[];
}

const getBimestreName = (selectedType: string) => {
  switch (selectedType) {
    case "1":
      return "1º Bimestre";
    case "2":
      return "2º Bimestre";
    case "3":
      return "3º Bimestre";
    case "4":
      return "4º Bimestre";
    default:
      return "";
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
        value={getBimestreName(selectedType)} // Converte o número para o nome do bimestre
        onChange={(value) => setSelectedType(value)} // Passa a string diretamente
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