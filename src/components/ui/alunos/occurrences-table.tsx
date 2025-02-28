"use client";

import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/alunos/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/alunos/select";

export function OccurrencesTable() {
  const [selectedType, setSelectedType] = useState("Todas");

  return (
    <div
     className="space-y-4 flex flex-col pb-[30px] border-b border-[#00000050] dark:border-[#ffffff50]">
      <div className="flex justify-end">
        <Select onChange={(value) => setSelectedType(value)}>
          <SelectTrigger>
          <SelectValue placeholder="Selecione um tipo"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todas">Todas</SelectItem>
            <SelectItem value="Advertência">Advertência</SelectItem>
            <SelectItem value="Falta">Falta</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" dark:text-white">Ocorrência</TableHead>
            <TableHead className=" dark:text-white">Tipo</TableHead>
            <TableHead className=" ark:text-white">Orientador</TableHead>
            <TableHead className="text-right dark:text-white">Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Adicione as linhas da tabela aqui */}
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
        
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
        
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
        
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
        
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
        
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">Exemplo 1</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">{selectedType}</TableHead>
            <TableHead className=" dark:bg-[#141414] dark:text-[#ffffffd8]">João Silva</TableHead>
            <TableHead className="text-right dark:bg-[#141414] dark:text-[#ffffffd8]">10/02/2025</TableHead>
          </TableRow>
        
        </TableBody>
      </Table>
      </div>
      </div>
  );
}
