import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { jwtDecode } from 'jwt-decode';
import Select from 'react-select'; // Importando react-select para um select mais moderno

const EngagementChart: React.FC = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bimestre, setBimestre] = useState<number>(1);
  const [allData, setAllData] = useState<any[]>([]);

  const bimestreOptions = [
    { value: 1, label: '1º Bimestre' },
    { value: 2, label: '2º Bimestre' },
    { value: 3, label: '3º Bimestre' },
    { value: 4, label: '4º Bimestre' },
  ];

  const normalizeData = (values: number[]) => {
    const maxValue = Math.max(...values);
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
      if (!resposta.ok) {
        throw new Error("Falha ao buscar os dados");
      }

      const dados = await resposta.json();
      setAllData(dados);

      const filteredData = dados.filter((item: any) => item.bimestre === bimestre);

      if (filteredData.length === 0) {
        setData([]);
        setError("Nenhum dado encontrado para o bimestre selecionado.");
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
        { name: 'Resposta 1', value: normalizedValues[0] },
        { name: 'Resposta 2', value: normalizedValues[1] },
        { name: 'Resposta 3', value: normalizedValues[2] },
        { name: 'Resposta 4', value: normalizedValues[3] },
        { name: 'Resposta 5', value: normalizedValues[4] },
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

  const handleBimestreChange = (selectedOption: any) => {
    setBimestre(selectedOption.value);
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Engajamento</h2>
      <div className="mb-4 flex justify-end items-center">
        <label htmlFor="bimestre" className="mr-2 font-bold">Selecione o Bimestre:</label>
        <Select
          id="bimestre"
          value={bimestreOptions.find(option => option.value === bimestre)}
          onChange={handleBimestreChange}
          options={bimestreOptions}
          className="w-48"
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
    </div>
  );
};

export default EngagementChart;