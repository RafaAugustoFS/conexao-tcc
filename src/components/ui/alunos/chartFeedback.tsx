import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { jwtDecode } from 'jwt-decode';
import SmallSelect from "@/components/ui/alunos/smallselect";

interface FeedbackData {
  bimestre: number;
  resposta1: number;
  resposta2: number;
  resposta3: number;
  resposta4: number;
  resposta5: number;
}

interface ChartData {
  name: string;
  value: number;
}

const EngagementChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [bimestre, setBimestre] = useState<number>(1);
  const [allData, setAllData] = useState<FeedbackData[]>([]);
  const [selectedType, setSelectedType] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const valorVindoDoSelect = (value: string) => {
    switch (value) {
      case "1º Bimestre":
        setSelectedType(1);
        setBimestre(1);
        break;
      case "2º Bimestre":
        setSelectedType(2);
        setBimestre(2);
        break;
      case "3º Bimestre":
        setSelectedType(3);
        setBimestre(3);
        break;
      case "4º Bimestre":
        setSelectedType(4);
        setBimestre(4);
        break;
    }
  };

  const types = ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"];

  const normalizeData = (values: number[]) => {
    const maxValue = Math.max(...values);
    if (maxValue === 0) return values;
    return values.map(value => (value / maxValue) * 5);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const decoded: any = jwtDecode(token);
      const userId = decoded?.sub;
      if (!userId) throw new Error("ID do usuário não encontrado no token");

      const resposta = await fetch(`http://localhost:3000/api/student/feedback/${userId}`);
      if (!resposta.ok) throw new Error("Falha ao buscar os dados");

      const dados = await resposta.json();
      setAllData(dados);

      const filteredData = bimestre === 0 ? dados : dados.filter((item: FeedbackData) => item.bimestre === bimestre);

      if (filteredData.length === 0) {
        setData([]);
        return;
      }

      const values = [
        filteredData[0].resposta1,
        filteredData[0].resposta2,
        filteredData[0].resposta3,
        filteredData[0].resposta4,
        filteredData[0].resposta5,
      ];

      const normalizedValues = normalizeData(values);

      const formattedData = [
        { name: 'Engajamento', value: normalizedValues[0] },
        { name: 'Disposição', value: normalizedValues[1] },
        { name: 'Entrega', value: normalizedValues[2] },
        { name: 'Atenção', value: normalizedValues[3] },
        { name: 'Comportamento', value: normalizedValues[4] },
      ];

      setData(formattedData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bimestre]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg dark:bg-[#141414]">
    <div className="mb-4 flex justify-end items-center gap-4">
      <SmallSelect
        aria-label="Selecione o Bimestre"
        selectedType={selectedType}
        setSelectedType={valorVindoDoSelect}
        placeholder="Selecione o Bimestre"
        items={types}
      
      />
  </div>
      {error ? (
        <div className="text-red-500 mb-4 flex items-center">
          <span className="material-icons mr-2">error</span>
          {error}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      )}
      {data.length === 0 && !loading && (
        <div className="text-center text-gray-500 mt-4">
          Nenhum feedback disponível para o bimestre selecionado.
        </div>
      )}
    </div>
  );
};

export default EngagementChart;