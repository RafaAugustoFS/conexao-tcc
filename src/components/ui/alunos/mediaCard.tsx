import SmallSelect from "@/components/ui/smallSelect";
import { useState } from "react";

export function MediaCard() {
  const [selectedType, setSelectedType] = useState("Todas");
  return (
    <div className="flex flex-row justify-between">
      <h2 className="text-lg font-bold">Média de notas</h2>
      <div className="flex flex-row items-center justify-center">
        <SmallSelect
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          placeholder="Selecione o Bimestre"
          items={["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"]}
        />
      </div>
    </div>
  );
}
