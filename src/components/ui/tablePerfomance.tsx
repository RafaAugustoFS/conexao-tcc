import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Select from "react-select";

const dataByBimester = {
  "1º Bimestre": [
    { name: "Engajamento", value: 80 },
    { name: "Disposição", value: 60 },
    { name: "Entrega", value: 90 },
    { name: "Atenção", value: 70 },
    { name: "Comportamento", value: 40 },
  ],
  "2º Bimestre": [
    { name: "Engajamento", value: 85 },
    { name: "Disposição", value: 65 },
    { name: "Entrega", value: 95 },
    { name: "Atenção", value: 75 },
    { name: "Comportamento", value: 50 },
  ],
  "3º Bimestre": [
    { name: "Engajamento", value: 70 },
    { name: "Disposição", value: 55 },
    { name: "Entrega", value: 80 },
    { name: "Atenção", value: 65 },
    { name: "Comportamento", value: 45 },
  ],
  "4º Bimestre": [
    { name: "Engajamento", value: 90 },
    { name: "Disposição", value: 75 },
    { name: "Entrega", value: 85 },
    { name: "Atenção", value: 80 },
    { name: "Comportamento", value: 60 },
  ],
};
type Bimester = "1º Bimestre" | "2º Bimestre" | "3º Bimestre" | "4º Bimestre";

export default function TablePerformance() {
  const options = Object.keys(dataByBimester).map((bimester) => ({
    value: bimester,
    label: bimester,
  }));
  const [selectedBimester, setSelectedBimester] =
    useState<Bimester>("1º Bimestre");
  const chartData = dataByBimester[selectedBimester] || [];
  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="bg-[#EAF4FF] dark:bg-[#141414] p-6 rounded-2xl shadow-md w-[1200px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold dark:text-white">
              Desempenho
            </h2>
            <Select
              options={options}
              defaultValue={options[0]}
              onChange={(option) =>
                setSelectedBimester(option?.value as Bimester)
              }
              className="w-48"
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#007bff" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}